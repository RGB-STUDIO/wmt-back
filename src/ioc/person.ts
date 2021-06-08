import { ContainerModule, interfaces } from 'inversify';
import TYPES from '@root/types';
import { PersonService } from '@root/kiddkeo/user/application/Person/Service/PersonService';
import { PersonServiceInterface } from '@root/kiddkeo/user/application/Person/Service/PersonService.interface';
import { PersonControllerInterface } from '@root/kiddkeo/user/application/Person/Controller/PersonController.interface';
import { PersonController } from '@root/kiddkeo/user/application/Person/Controller/PersonController';
import serviceFactoryFunction from '@root/ioc/utils/serviceFactory';

const person = new ContainerModule((bind) => {
  bind<PersonServiceInterface>(TYPES.PersonService).to(PersonService);
  bind<interfaces.Newable<PersonControllerInterface>>(TYPES.PersonController)
    .toConstructor(PersonController);
  bind<interfaces.Factory<PersonControllerInterface>>(TYPES.PersonFactory)
    .toFactory<PersonControllerInterface>(
    serviceFactoryFunction<PersonControllerInterface>(TYPES.PersonController),
  );
});

export default person;
