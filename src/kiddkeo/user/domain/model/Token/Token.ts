import {TokenDto} from "@root/kiddkeo/user/domain/model/Token/Token.dto";

export class Token {
    userId:string;
    token:string;
    createAt:Date;
    constructor(userId:string,token:string,createAt:Date) {
    this.userId=userId;
    this.token=token;
    this.createAt=createAt;
    }

    toDto():TokenDto{
        return {
            userId:this.userId,
            token:this.token,
            created_at:this.createAt
        }
    }
}