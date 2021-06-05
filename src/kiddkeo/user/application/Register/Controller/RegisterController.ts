import { RegisterControllerInterface } from '@root/kiddkeo/user/application/Register/Controller/RegisterController.interface';
import { Db, MongoClient } from 'mongodb';
import { PersonRepositoryInterface } from '@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface';
import { PersonRepository } from '@root/kiddkeo/user/infraestructura/persistence/person/impl/PersonRepository';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { Register } from '@root/kiddkeo/user/domain/model/Register/Register';
import { PersonCollection } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonCollection';

export class RegisterController implements RegisterControllerInterface {
  private personRepository:PersonRepositoryInterface;

  constructor(database:Db) {
    this.personRepository = new PersonRepository(database);
  }

  async save(schema:RegisterDto):Promise<Register> {
    const {
      _id: uid,
      name,
      lastname,
      email,
    }:PersonCollection = await this.personRepository.save(schema);

    return new Register(uid,
      name,
      lastname,
      email);
  }
}
