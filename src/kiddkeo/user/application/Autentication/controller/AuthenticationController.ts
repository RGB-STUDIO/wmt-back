import {Db} from "mongodb";
import {PersonRepository} from "@root/kiddkeo/user/infraestructura/persistence/person/impl/PersonRepository";
import {PersonRepositoryInterface} from "@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface";
import {AuthenticationControllerInterface} from "@root/kiddkeo/user/application/Autentication/controller/AuthenticationController.interface";
import {CustomExternalError} from "@utils/CustomExternalError";
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Person/Register.dto";
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";
import {injectable} from "inversify";
import {TokenRepository} from "@root/kiddkeo/user/infraestructura/persistence/token/impl/TokenRepository";
import {TokenRepositoryInterface} from "@root/kiddkeo/user/infraestructura/persistence/token/TokenRepository.interface";
import {Person} from "@root/kiddkeo/user/domain/model/Person/Person";

@injectable()
export class AuthenticationController implements AuthenticationControllerInterface{
    private personRepository:PersonRepositoryInterface;

    private tokenRepository:TokenRepositoryInterface;

    private password!:string;

    private referralCode!:string;

    constructor(database:Db) {
        this.personRepository = new PersonRepository(database);
        this.tokenRepository = new TokenRepository(database)
    }

    private async generatePassword(password:string) {
        const salt =await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(password, salt);
    }

    private generateReferralCode() {
        this.referralCode = randomUUID();
    }


    async login(email: string, password: string): Promise<Person> {
       const personSnapshot = await this.personRepository.findByEmail(email);
       if (personSnapshot === null){
           throw new CustomExternalError({
               message: 'Unregistered user',
               errors: [{
                   resource: 'Authentication',
                   field: 'schema',
                   code: 'unprocessable',
               }],
           }, {
               code: 400,
           });
       }

        if (!personSnapshot.verified){
            throw new CustomExternalError({
                message: 'Unverified user',
                errors: [{
                    resource: 'Authentication',
                    field: 'schema',
                    code: 'unprocessable',
                }],
            }, {
                code: 400,
            });
        }
     const person= new Person(personSnapshot._id,
            personSnapshot.firstname,
            personSnapshot.secondName,
            personSnapshot.surname,
            personSnapshot.secondSurname,
            personSnapshot.email,
            personSnapshot.password,
            personSnapshot.username,
            personSnapshot.address,
            personSnapshot.phones,
            personSnapshot.document,
            personSnapshot.dateOfBirth,
            personSnapshot.active,
            personSnapshot.verified,
            personSnapshot.twoFa,
            personSnapshot.referralCode,
            personSnapshot.referrer);
      const verifyPwd=await person.comparePassword(password)
        if (!verifyPwd){
           throw new CustomExternalError({
               message: 'Incorrect Data',
               errors: [{
                   resource: 'Authentication',
                   field: 'schema',
                   code: 'unprocessable',
               }],
           }, {
               code: 400,
           });
       }
      person.generateJWT();
      return person
    }

    async register(schema:RegisterDto): Promise<Person> {
        if (!schema.password) {
            throw new CustomExternalError({
                message: 'Password in entity is undefined',
                errors: [{
                    resource: 'Authentication',
                    field: 'schema',
                    code: 'unprocessable',
                }],
            }, {
                code: 400,
            });
        }
        await this.generatePassword(schema.password);
        const referrer = await this.personRepository.findReferrerCode(schema.referrer);
        if (referrer === null) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw new CustomExternalError({
                message: 'referrer not fount',
                errors: [{
                    resource: 'Authentication',
                    field: 'schema',
                    code: 'unprocessable',
                }],
            }, {
                code: 400,
            });
        }
        this.generateReferralCode();
        try{
            const personSnapshot=await this.personRepository.save({
                ...schema,
                password: this.password,
                referralCode: this.referralCode,
                dateOfBirth: new Date(schema.dateOfBirth),
            });

            const person= new Person(personSnapshot._id,
                personSnapshot.firstname,
                personSnapshot.secondName,
                personSnapshot.surname,
                personSnapshot.secondSurname,
                personSnapshot.email,
                personSnapshot.password,
                personSnapshot.username,
                personSnapshot.address,
                personSnapshot.phones,
                personSnapshot.document,
                personSnapshot.dateOfBirth,
                personSnapshot.active,
                personSnapshot.verified,
                personSnapshot.twoFa,
                personSnapshot.referralCode,
                personSnapshot.referrer);

             person.generateVerificationToken()
            await this.tokenRepository.save(person.tokenVerified.toDto())
            return person;

        }catch (err) {
            if (err.name==='MongoError'){
                if (err.code === 11000 && err.keyPattern.email === 1){
                    throw new CustomExternalError({
                        message: 'the email is already in use please place another',
                        errors: [{
                            resource: 'Authentication',
                            field: 'schema',
                            code: 'unprocessable',
                        }],
                    }, {
                        code: 400,
                    });
                }
                if (err.code === 11000 && err.keyPattern.username === 1){
                    throw new CustomExternalError({
                        message: 'the username is already in use please place another',
                        errors: [{
                            resource: 'Authentication',
                            field: 'schema',
                            code: 'unprocessable',
                        }],
                    }, {
                        code: 400,
                    });
                }
            }
            throw err
        }
    }
    async verifyUser(token:string):Promise<Person>{
       const t = await this.tokenRepository.findByToken(token);
        if (t === null) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw new CustomExternalError({
                message: 'token not fount',
                errors: [{
                    resource: 'Authentication',
                    field: 'schema',
                    code: 'unprocessable',
                }],
            }, {
                code: 400,
            });
        }

        const user = this.personRepository.update({});
        return {} as Person;
    }
}