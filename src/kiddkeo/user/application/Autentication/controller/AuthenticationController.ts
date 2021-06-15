import {Db} from "mongodb";
import {PersonRepository} from "@root/kiddkeo/user/infraestructura/persistence/person/impl/PersonRepository";
import {PersonRepositoryInterface} from "@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface";
import {AuthenticationControllerInterface} from "@root/kiddkeo/user/application/Autentication/controller/AuthenticationController.interface";
import {Login} from "@root/kiddkeo/user/domain/model/Login/Login";
import {Register} from "@root/kiddkeo/user/domain/model/Register/Register";
import {CustomExternalError} from "@utils/CustomExternalError";
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Register/Register.dto";
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";
import {injectable} from "inversify";

@injectable()
export class AuthenticationController implements AuthenticationControllerInterface{
    private personRepository:PersonRepositoryInterface;

    private password!:string;

    private referralCode!:string;

    constructor(database:Db) {
        this.personRepository = new PersonRepository(database);
    }

    private async generatePassword(password:string) {
        const salt =await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(password, salt);
    }

    private generateReferralCode() {
        this.referralCode = randomUUID();
    }


    async login(email: string, password: string): Promise<Login> {
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
      const userLoggedIn = new Login(personSnapshot._id,personSnapshot.email,personSnapshot.username,personSnapshot.password)
      const verifyPwd=await userLoggedIn.comparePassword(password)
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
      userLoggedIn.generateJWT();
      return userLoggedIn
    }

    async register(schema:RegisterDto): Promise<Register> {
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
            return new Register(personSnapshot._id,
                personSnapshot.username,
                personSnapshot.firstname,
                personSnapshot.surname,
                personSnapshot.dateOfBirth,
                personSnapshot.email,
                personSnapshot.referrer,
                personSnapshot.referralCode);
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
}