import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { Register } from '@root/kiddkeo/user/domain/model/Register/Register';

export interface RegisterControllerInterface {
  save(schema:RegisterDto):Promise<Register>
}
