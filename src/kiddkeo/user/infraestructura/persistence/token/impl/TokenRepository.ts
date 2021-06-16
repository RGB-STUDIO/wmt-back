import {TokenRepositoryInterface} from "@root/kiddkeo/user/infraestructura/persistence/token/TokenRepository.interface";
import {Db} from "mongodb";
import {TokenSchema} from "@root/kiddkeo/user/infraestructura/persistence/token/types/TokenSchema";
import {TokenDto} from "@root/kiddkeo/user/domain/model/Token/Token.dto";
import {COLLECTIONS} from "@root/Constants";

export class TokenRepository implements TokenRepositoryInterface{
    private database:Db;

    constructor(database:Db) {
        this.database = database;
    }

    async findByToken(token:string):Promise<TokenSchema>{
       return await this.database.collection(COLLECTIONS.TOKEN).findOne({token:token})
    }

    async save(schema:TokenDto): Promise<TokenSchema> {
         const tokenSnapshot=await this.database.collection(COLLECTIONS.TOKEN).insertOne(schema);
        return tokenSnapshot.ops[0]
    }
}