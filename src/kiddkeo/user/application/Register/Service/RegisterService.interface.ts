import { Register } from '@root/kiddkeo/user/domain/model/Register/Register';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';

export interface RegisterServiceInterface {
  save(schema:RegisterDto):Promise<Register>
}
