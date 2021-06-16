import {TokenSchema} from "@root/kiddkeo/user/infraestructura/persistence/token/types/TokenSchema";
import {TokenDto} from "@root/kiddkeo/user/domain/model/Token/Token.dto";

export interface TokenRepositoryInterface {
    findByToken(token:string):Promise<TokenSchema>;
    save(schema:TokenDto):Promise<TokenSchema>
}