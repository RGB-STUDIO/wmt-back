import { DeepPartial } from '@utils/types/deeppartial';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';

export interface PersonControllerInterface{
  update(schema:DeepPartial<PersonDto>):Promise<PersonSchema>
  softDelete(uid:string):Promise<PersonSchema>
  delete(uid:string):Promise<PersonSchema>
}
