import { MongoClient } from 'mongodb';
import TYPES from '@root/types';
import { inject, injectable } from 'inversify';
import { IEnvService } from '@utils/env';

export interface MongoConnectionSingletonInterface {
  getClient():Promise<MongoClient>
}
@injectable()
export class MongoConnectionSingleton {
  private readonly client;

  private isConnected:Boolean = false;

  private clientConnected:unknown;

  constructor(@inject(TYPES.EnvService) private envService: IEnvService) {
    const url = this.envService.get('DATABASE_URL');
    if (!url) {
      throw new Error('Database url not exist');
    }
    const opt = {
      native_parser: true,
      useUnifiedTopology: true,
    };

    this.client = new MongoClient(url, opt);
  }

  public async getClient():Promise<MongoClient> {
    if (!this.isConnected) {
      this.clientConnected = this.client.connect();
      this.isConnected = true;
      return this.client;
    }
    return this.client;
  }
}
