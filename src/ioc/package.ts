import { ContainerModule, interfaces } from 'inversify';
import serviceFactoryFunction from '@root/ioc/utils/serviceFactory';
import { PackageControllerInterface } from '../kiddkeo/admin/aplication/controllers/PackageController.interface';
import { PackageController } from '../kiddkeo/admin/aplication/controllers/PackageController';
import TYPES from '../types';
import { PackageService } from '../kiddkeo/admin/aplication/service/PackageService';
import { PackageServiceInterface } from '../kiddkeo/admin/aplication/service/PackageService.interface';

const Package = new ContainerModule((bind:interfaces.Bind) => {
  bind<PackageServiceInterface>(TYPES.PackageService).to(PackageService);
  bind<interfaces.Newable<PackageControllerInterface>>(TYPES.PackageController)
    .toConstructor(PackageController);
  bind<interfaces.Factory<PackageControllerInterface>>(TYPES.PackageFactory)
    .toFactory<PackageControllerInterface>(
    serviceFactoryFunction<PackageControllerInterface>(TYPES.PackageController),
  );
});

export default Package;
