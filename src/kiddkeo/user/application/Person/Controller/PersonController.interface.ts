import { DeepPartial } from '@utils/types/deeppartial';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Register/Register.dto";

export interface PersonControllerInterface{
  find(uid:string):Promise<PersonSchema>;
  save(schema:RegisterDto):Promise<PersonSchema>;
  update(schema:DeepPartial<PersonDto>):Promise<PersonSchema>;
  softDelete(uid:string):Promise<PersonSchema>;
  delete(uid:string):Promise<PersonSchema>;
}
