import {inject, injectable} from "inversify";
import TYPES from "@root/types";
import ClientMongo, {MongoClientProviderInterface} from "@database/ClientMongo";
import {AuthenticationServiceInterface} from "@root/kiddkeo/user/application/Autentication/servicio/AuthenticationService.interface";
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Person/Register.dto";
import {Db} from "mongodb";
import {AuthenticationControllerInterface} from "@root/kiddkeo/user/application/Autentication/controller/AuthenticationController.interface";
import {Person} from "@root/kiddkeo/user/domain/model/Person/Person";

@injectable()
export class AuthenticationService extends ClientMongo implements AuthenticationServiceInterface{
    private authenticationController!:AuthenticationControllerInterface;

    constructor(@inject(TYPES.MongoClient) mongoClient:MongoClientProviderInterface,
                @inject(TYPES.AuthenticationFactory)
                private authenticationFactory:(database:Db)=>AuthenticationControllerInterface) {
        super(mongoClient)
    }

    private async connect() {
        this.clientMongo = await this.connectMongo();
        this.authenticationController = this.authenticationFactory(this.database);
    }

    async login(email: string, password: string): Promise<Person> {
        try {
            await this.connect();
            await this.startSession();
            return await this.authenticationController.login(email,password)
        }catch (err){
            throw err
        }finally {
            await this.endSession();
        }
    }

   async register(schema:RegisterDto): Promise<Person> {
        try {
            await this.connect();
            await this.startSession();
            await this.startTransaction();
            const personRecord = await this.authenticationController.register(schema);
            await this.commitTransaction();
            return personRecord;
        } catch (err) {
            console.log(err)
            await this.abortTransaction();
            throw err
        } finally {
            await this.endSession();
        }
    };

    async verifyUser(token:string):Promise<Person>{
        return {} as Person
    }
}