import { PersonServiceInterface } from '@root/kiddkeo/user/application/Person/Service/PersonService.interface';
import { inject } from 'inversify';
import TYPES from '@root/types';
import ClientMongo, { MongoClientProviderInterface } from '@database/ClientMongo';
import { Person } from '@root/kiddkeo/user/domain/model/Person/Person';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import { DeepPartial } from '@utils/types/deeppartial';
import { PersonControllerInterface } from '@root/kiddkeo/user/application/Person/Controller/PersonController.interface';
import { Db } from 'mongodb';
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Register/Register.dto";
import {Register} from "@root/kiddkeo/user/domain/model/Register/Register";
import {PersonSchema} from "@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema";

export class PersonService extends ClientMongo implements PersonServiceInterface {
  private personController!:PersonControllerInterface;

  constructor(@inject(TYPES.MongoClient) mongoClient:MongoClientProviderInterface,
    @inject(TYPES.PersonFactory)
    private personFactory:(database:Db)=>PersonControllerInterface) {
    super(mongoClient);
  }

  private async connect() {
    this.clientMongo = await this.connectMongo();
    this.personController = this.personFactory(this.database);
  }

  async find(uid: string): Promise<Person> {
  return {} as Person;
  }

  async save(schema: RegisterDto): Promise<Register> {
    let registerSnapShot:PersonSchema;
    try {
      await this.connect();
      await this.startSession();
      await this.startTransaction();
      registerSnapShot = await this.personController.save(schema);
      await this.commitTransaction();
      // eslint-disable-next-line no-underscore-dangle
      return new Register(registerSnapShot._id,
          registerSnapShot.username,
          registerSnapShot.firstname,
          registerSnapShot.surname,
          registerSnapShot.dateOfBirth,
          registerSnapShot.email,
          registerSnapShot.referrer,
          registerSnapShot.referralCode);
    } catch (err) {
      await this.abortTransaction();
      throw err
    } finally {
      await this.endSession();
    }
  }

  async update(schema: DeepPartial<PersonDto>): Promise<Person> {
    try {
      await this.connect();
      await this.startSession();
      await this.startTransaction();
      await this.personController.update(schema);
      await this.commitTransaction();
    } catch (err) {
      await this.abortTransaction();
      throw new Error('');
    } finally {
      await this.endSession();
    }
    return {} as Person;
  }

  async softDelete(uid: string): Promise<Person> {
    try {
      await this.connect();
      await this.startSession();
      await this.startTransaction();
      await this.personController.softDelete(uid);
      await this.commitTransaction();
    } catch (err) {
      await this.abortTransaction();
      throw new Error('');
    } finally {
      await this.endSession();
    }
    return {} as Person;
  }

  async delete(uid: string): Promise<Person> {
    try {
      await this.connect();
      await this.startSession();
      await this.startTransaction();
      await this.personController.delete(uid);
      await this.commitTransaction();
    } catch (err) {
      await this.abortTransaction();
      throw new Error('');
    } finally {
      await this.endSession();
    }
    return {} as Person;
  }
}
