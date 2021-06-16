import { RegisterDto } from '@root/kiddkeo/user/domain/model/Person/Register.dto';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import { DeepPartial } from '@utils/types/deeppartial';

export interface PersonRepositoryInterface {
  find(uid:string):Promise<PersonSchema>;
  findByEmail(email:string):Promise<PersonSchema>;
  findByUsername(username:string):Promise<Boolean>;
  save(schema:RegisterDto):Promise<PersonSchema>;
  update(schema:DeepPartial<PersonDto>):Promise<PersonSchema>;
  softDelete(uid:string):Promise<PersonSchema>
  delete(uid:string):Promise<PersonSchema>
  findReferrerCode(code:string):Promise<PersonSchema>;
}
