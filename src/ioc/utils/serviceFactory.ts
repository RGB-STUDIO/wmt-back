import { interfaces } from 'inversify';
import { Db } from 'mongodb';

export default function serviceFactoryFunction<T>(serviceSymbol: symbol) {
  return (context: interfaces.Context) => (database:Db) => {
    const ServiceConstructor = context.container
      .get<interfaces.Newable<T>>(serviceSymbol);
    return new ServiceConstructor(database);
  };
}
