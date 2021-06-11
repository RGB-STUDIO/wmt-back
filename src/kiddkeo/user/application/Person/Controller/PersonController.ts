import { PersonControllerInterface } from '@root/kiddkeo/user/application/Person/Controller/PersonController.interface';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import { DeepPartial } from '@utils/types/deeppartial';

export class PersonController implements PersonControllerInterface {
  async update(schema: DeepPartial<PersonDto>): Promise<PersonSchema> {
    return {} as PersonSchema;
  }

  async softDelete(uid: string): Promise<PersonSchema> {
    return {} as PersonSchema;
  }

  async delete(uid: string): Promise<PersonSchema> {
    return {} as PersonSchema;
  }
}
