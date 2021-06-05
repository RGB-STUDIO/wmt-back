import { Db } from 'mongodb';
import { PersonRepositoryInterface } from '@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonCollection } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonCollection';

export class PersonRepository implements PersonRepositoryInterface {
  private database:Db;

  constructor(database:Db) {
    // console.log(database);
    this.database = database;
  }

  async save(schema: RegisterDto): Promise<PersonCollection> {
    const registerSnapshot = await this.database.collection('person').insertOne(schema);
    return registerSnapshot.ops[0];
  }
}
