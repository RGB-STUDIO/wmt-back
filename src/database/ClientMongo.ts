import { inject, injectable } from 'inversify';
import { ClientSession, Db, MongoClient } from 'mongodb';
import TYPES from '@root/types';
import { DATABASE_NAME } from '@root/Constants';

export interface IMongoClient extends MongoClient {
}

export type MongoClientProviderInterface = () => Promise<IMongoClient>;

@injectable()
export default class ClientMongo {
  protected clientProviderMongo:MongoClientProviderInterface;

  protected clientMongo!:MongoClient;

  protected session!:ClientSession;

  protected database!:Db;

  constructor(@inject(TYPES.MongoClient) ClientProviderMongo: MongoClientProviderInterface) {
    this.clientProviderMongo = ClientProviderMongo;
  }

  async connectMongo():Promise<MongoClient> {
    this.clientMongo = await this.clientProviderMongo();
    this.database = this.clientMongo.db(DATABASE_NAME);
    return this.clientMongo;
  }

  async startSession():Promise<void> {
    this.session = this.clientMongo.startSession();
  }

  async endSession():Promise<void> {
    await this.session.endSession();
  }

  async startTransaction():Promise<void> {
    await this.session.startTransaction({ readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } });
  }

  async commitTransaction():Promise<void> {
    await this.session.commitTransaction();
  }

  async abortTransaction():Promise<void> {
    await this.session.abortTransaction();
  }
}
