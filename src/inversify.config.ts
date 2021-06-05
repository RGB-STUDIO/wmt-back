import { Container } from 'inversify';
import TYPES from '@root/types';
import EnvService, { Environment, IEnvService } from '@utils/env';
import database from '@root/ioc/database';
import authentication from '@root/ioc/authentication';

const container = new Container();

container.bind<Environment>(TYPES.ProcessEnvironment).toConstantValue(process.env);
container.bind<IEnvService>(TYPES.EnvService).to(EnvService).inSingletonScope();
container.load(database);
container.load(authentication);

export default container;
