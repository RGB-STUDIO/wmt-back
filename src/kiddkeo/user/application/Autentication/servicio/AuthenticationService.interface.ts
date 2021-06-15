import {Login} from "@root/kiddkeo/user/domain/model/Login/Login";
import {Register} from "@root/kiddkeo/user/domain/model/Register/Register";
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Register/Register.dto";

export interface AuthenticationServiceInterface{
    login(email:string,password:string):Promise<Login>
    register(schema:RegisterDto):Promise<Register>
}