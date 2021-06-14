import {PersonControllerInterface} from '@root/kiddkeo/user/application/Person/Controller/PersonController.interface';
import {PersonSchema} from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import {PersonDto} from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import {DeepPartial} from '@utils/types/deeppartial';
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Register/Register.dto";
import {CustomExternalError} from "@utils/CustomExternalError";
import {PersonRepositoryInterface} from "@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface";
import {Db} from "mongodb";
import {PersonRepository} from "@root/kiddkeo/user/infraestructura/persistence/person/impl/PersonRepository";

export class PersonController implements PersonControllerInterface {

  private personRepository:PersonRepositoryInterface;

  private password!:string;

  private referralCode!:string;

  constructor(database:Db) {
    this.personRepository = new PersonRepository(database);
  }

  async find(uid: string): Promise<PersonSchema> {
    return {} as PersonSchema;
  }

  private generatePassword(password:string) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(password, salt);
  }

  private generateReferralCode() {
    this.referralCode = randomUUID();
  }

  async save(schema:RegisterDto):Promise<PersonSchema> {
    if (schema.password) {
      this.generatePassword(schema.password);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new CustomExternalError({
        message: 'Password in entity is undefined',
        errors: [{
          resource: 'Person',
          field: 'schema',
          code: 'unprocessable',
        }],
      }, {
        code: 400,
      });
    }
    const referrer = await this.personRepository.findReferrerCode(schema.referrer);
    if (referrer === null) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new CustomExternalError({
        message: 'referrer not fount',
        errors: [{
          resource: 'Register',
          field: 'schema',
          code: 'unprocessable',
        }],
      }, {
        code: 400,
      });
    }
    this.generateReferralCode();
    try{
      return await this.personRepository.save({
        ...schema,
        password: this.password,
        referralCode: this.referralCode,
        dateOfBirth: new Date(schema.dateOfBirth),
      });
    }catch (err) {
      if (err.name==='MongoError'){
        if (err.code === 11000 && err.keyPattern.email === 1){
          throw new CustomExternalError({
            message: 'the email is already in use please place another',
            errors: [{
              resource: 'Register',
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
              resource: 'Register',
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

  async update(schema: DeepPartial<PersonDto>): Promise<PersonSchema> {
    return {} as PersonSchema;
  }

  async softDelete(uid: string): Promise<PersonSchema> {
    return {} as PersonSchema;
  }

  async delete(uid: string): Promise<PersonSchema> {
    return {} as PersonSchema;
  }
}
