import { ContainerModule, interfaces } from 'inversify';
import { MongoConnectionSingleton, MongoConnectionSingletonInterface } from '@database/MongoConnectionSingleton';
import TYPES from '@root/types';
import { IMongoClient, MongoClientProviderInterface } from '@database/ClientMongo';

const database = new ContainerModule((bind:interfaces.Bind) => {
  bind<MongoConnectionSingletonInterface>(TYPES.MongoConnectionSingleton)
    .to(MongoConnectionSingleton)
    .inSingletonScope();

  bind<MongoClientProviderInterface>(TYPES.MongoClient)
    .toProvider<IMongoClient>((context) => () => {
    const pool = context.container
      .get<MongoConnectionSingletonInterface>(TYPES.MongoConnectionSingleton);
    return pool.getClient();
  });
});

export default database;
