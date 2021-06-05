import { ContainerModule, interfaces } from 'inversify';
import { RegisterControllerInterface } from '@root/kiddkeo/user/application/Register/Controller/RegisterController.interface';
import { RegisterController } from '@root/kiddkeo/user/application/Register/Controller/RegisterController';
import TYPES from '@root/types';
import serviceFactoryFunction from '@root/ioc/utils/serviceFactory';
import { RegisterService } from '@root/kiddkeo/user/application/Register/Service/RegisterService';
import { RegisterServiceInterface } from '@root/kiddkeo/user/application/Register/Service/RegisterService.interface';

const authentication = new ContainerModule((bind:interfaces.Bind) => {
  bind<RegisterServiceInterface>(TYPES.RegisterService).to(RegisterService);
  bind<interfaces.Newable<RegisterControllerInterface>>(TYPES.RegisterController)
    .toConstructor(RegisterController);
  bind<interfaces.Factory<RegisterControllerInterface>>(TYPES.RegisterFactory)
    .toFactory<RegisterControllerInterface>(serviceFactoryFunction<RegisterControllerInterface>(TYPES.RegisterController));
});

export default authentication;
