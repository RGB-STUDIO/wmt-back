import { RegisterControllerInterface } from '@root/kiddkeo/user/application/Register/Controller/RegisterController.interface';
import { Db } from 'mongodb';
import { PersonRepositoryInterface } from '@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface';
import { PersonRepository } from '@root/kiddkeo/user/infraestructura/persistence/person/impl/PersonRepository';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonCollection } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonCollection';
import bcrypt from 'bcrypt';

export class RegisterController implements RegisterControllerInterface {
  private personRepository:PersonRepositoryInterface;

  private password!:string;

  constructor(database:Db) {
    this.personRepository = new PersonRepository(database);
  }

  private generatePassword(password:string) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(password, salt);
  }

  async save(schema:RegisterDto):Promise<PersonCollection> {
    if (schema.password) {
      this.generatePassword(schema.password);
    } else {
      throw new Error('password in entity is undefined');
    }
    return this.personRepository.save({ ...schema, password: this.password });
  }
}
