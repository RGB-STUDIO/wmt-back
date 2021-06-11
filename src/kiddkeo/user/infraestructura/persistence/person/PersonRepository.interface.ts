import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import { DeepPartial } from '@utils/types/deeppartial';

export interface PersonRepositoryInterface {
  save(schema:RegisterDto):Promise<PersonSchema>
  update(schema:DeepPartial<PersonDto>):Promise<PersonSchema>
  findReferrerCode(code:string):Promise<PersonSchema>
}
