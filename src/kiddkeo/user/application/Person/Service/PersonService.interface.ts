import { DeepPartial } from '@utils/types/deeppartial';
import { Person } from '@root/kiddkeo/user/domain/model/Person/Person';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import {Register} from "@root/kiddkeo/user/domain/model/Register/Register";
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Register/Register.dto";

export interface PersonServiceInterface{
  find(uid:string):Promise<Person>;
  save(schema:RegisterDto):Promise<Register>;
  update(schema:DeepPartial<PersonDto>):Promise<Person>;
  softDelete(uid:string):Promise<Person>;
  delete(uid:string):Promise<Person>;
}
