import { Db } from 'mongodb';
import { PersonRepositoryInterface } from '@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import { DeepPartial } from '@utils/types/deeppartial';
import { COLLECTIONS } from '@root/Constants';

export class PersonRepository implements PersonRepositoryInterface {
  private database:Db;

  constructor(database:Db) {
    this.database = database;
  }

  async save(schema: RegisterDto): Promise<PersonSchema> {
    const registerSnapshot = await this.database.collection(COLLECTIONS.PERSON).insertOne(schema);
    return registerSnapshot.ops[0];
  }

  async update(schema: DeepPartial<PersonDto>): Promise<PersonSchema> {
    return {} as PersonSchema;
  }
}
