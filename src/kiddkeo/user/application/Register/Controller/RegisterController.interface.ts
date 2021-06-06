import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonCollection } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonCollection';

export interface RegisterControllerInterface {
  save(schema:RegisterDto):Promise<PersonCollection>
}
