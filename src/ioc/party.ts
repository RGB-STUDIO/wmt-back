import { ContainerModule, interfaces } from 'inversify';
import serviceFactoryFunction from '@root/ioc/utils/serviceFactory';
import { PackageControllerInterface } from '../kiddkeo/party/aplication/controllers/PackageController.interface';
import { PackageController } from '../kiddkeo/party/aplication/controllers/PackageController';
import TYPES from '../types';
import { PackageService } from '../kiddkeo/party/aplication/service/PackageService';
import { PackageServiceInterface } from '../kiddkeo/party/aplication/service/PackageService.interface';

const party = new ContainerModule((bind:interfaces.Bind) => {
  bind<PackageServiceInterface>(TYPES.PackageService).to(PackageService);
  bind<interfaces.Newable<PackageControllerInterface>>(TYPES.PackageController)
    .toConstructor(PackageController);
  bind<interfaces.Factory<PackageControllerInterface>>(TYPES.PackageFactory)
    .toFactory<PackageControllerInterface>(
    serviceFactoryFunction<PackageControllerInterface>(TYPES.PackageController),
  );
});

export default party;
