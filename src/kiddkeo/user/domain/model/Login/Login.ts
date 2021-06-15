import {Person} from "@root/kiddkeo/user/domain/model/Person/Person";
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
import {JWT_KEY_SECRET} from "@root/Constants";
import {LoginDto} from "@root/kiddkeo/user/domain/model/Login/Login.dto";

export class Login{

    uid:string;

    email:string;

    username:string;

    password:string

    token:string;

    constructor(uid:string, email:string, username:string, password:string) {
        this.uid=uid;
        this.email=email;
        this.username=username;
        this.password=password
        this.token='';
    }

    generateJWT(){
        let payload = {
            id: this.uid,
            email:this.email
        };
        this.token= jwt.sign(payload, JWT_KEY_SECRET,{
            expiresIn: 1440
        });
    }

    async comparePassword(password:string){
        return await bcrypt.compare(password,this.password)
    }

    toJson():LoginDto{
        return {
            uid:this.uid,
            email:this.email,
            token:this.token
        }
    }
}