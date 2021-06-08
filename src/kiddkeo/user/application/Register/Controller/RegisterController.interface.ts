import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';

export interface RegisterControllerInterface {
  save(schema:RegisterDto):Promise<PersonSchema>
}
