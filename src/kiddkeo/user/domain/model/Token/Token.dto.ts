import {ObjectId} from "mongodb";

export interface TokenDto {
    user_id:ObjectId,
    token:string,
    created_at:string
}