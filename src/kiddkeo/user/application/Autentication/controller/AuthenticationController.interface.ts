import {RegisterDto} from "@root/kiddkeo/user/domain/model/Person/Register.dto";
import {Person} from "@root/kiddkeo/user/domain/model/Person/Person";

export interface AuthenticationControllerInterface{
    login(email:string,password:string):Promise<Person>;
    register(schema:RegisterDto):Promise<Person>;
    verifyUser(token:string):Promise<Person>;
}