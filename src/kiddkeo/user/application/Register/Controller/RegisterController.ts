import { RegisterControllerInterface } from '@root/kiddkeo/user/application/Register/Controller/RegisterController.interface';
import { Db } from 'mongodb';
import { PersonRepositoryInterface } from '@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface';
import { PersonRepository } from '@root/kiddkeo/user/infraestructura/persistence/person/impl/PersonRepository';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { CustomExternalError } from '@utils/CustomExternalError';

export class RegisterController implements RegisterControllerInterface {
  private personRepository:PersonRepositoryInterface;

  private password!:string;

  private referralCode!:string;

  constructor(database:Db) {
    this.personRepository = new PersonRepository(database);
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
    console.log(referrer)
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
    return this.personRepository.save({
      ...schema,
      password: this.password,
      referralCode: this.referralCode,
      dateOfBirth: new Date(schema.dateOfBirth),
    });
  }
}
