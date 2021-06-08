import { DeepPartial } from '@utils/types/deeppartial';
import { Person } from '@root/kiddkeo/user/domain/model/Person/Person';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';

export interface PersonServiceInterface{
  update(schema:DeepPartial<PersonDto>):Promise<Person>
  softDelete(uid:string):Promise<Person>
  delete(uid:string):Promise<Person>
}
