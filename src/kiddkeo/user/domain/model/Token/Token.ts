import {TokenDto} from "@root/kiddkeo/user/domain/model/Token/Token.dto";
import {ObjectId} from "mongodb";

export class Token {
    userId:ObjectId;
    token:string;
    createAt:string;
    constructor(userId:ObjectId,token:string,createAt:string) {
    this.userId=userId;
    this.token=token;
    this.createAt=createAt;
    }

    toDto():TokenDto{
        return {
            user_id:this.userId,
            token:this.token,
            created_at:this.createAt
        }
    }
}