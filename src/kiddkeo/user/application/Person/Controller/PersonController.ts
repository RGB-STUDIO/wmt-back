import {PersonControllerInterface} from '@root/kiddkeo/user/application/Person/Controller/PersonController.interface';
import {PersonSchema} from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import {PersonDto} from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import {DeepPartial} from '@utils/types/deeppartial';
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Person/Register.dto";
import {CustomExternalError} from "@utils/CustomExternalError";
import {PersonRepositoryInterface} from "@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface";
import {Db} from "mongodb";
import {PersonRepository} from "@root/kiddkeo/user/infraestructura/persistence/person/impl/PersonRepository";

export class PersonController implements PersonControllerInterface {

  private personRepository:PersonRepositoryInterface;

  constructor(database:Db) {
    this.personRepository = new PersonRepository(database);
  }

  async find(uid: string): Promise<PersonSchema> {
    return {} as PersonSchema;
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
