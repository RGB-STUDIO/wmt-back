import {inject} from "inversify";
import TYPES from "@root/types";
import ClientMongo, {MongoClientProviderInterface} from "@database/ClientMongo";
import {Collection} from "mongodb";
import {COLLECTIONS} from "../../Contants";
import {randomUUID} from "crypto";
import {PersonDto} from "@root/kiddkeo/user/domain/model/Person/Person.dto";
import {mainLogger as logger} from "@utils/loggers";

export class Seeders extends ClientMongo{
    private collections!:Collection[];

    private seedersPerson!:PersonDto[];
    constructor(@inject(TYPES.MongoClient) mongoClient:MongoClientProviderInterface) {
        super(mongoClient);
    }

    private async connect() {
        await this.connectMongo();
        const collections = await this.database.command({
            listCollections: 1.0,
            authorizedCollections: true,
            nameOnly: true,
        });
        this.collections = collections.cursor.firstBatch as Collection[];
    }

    private searchDocuments(collection:string,key:string,value:string):Promise<Document[]>{
        return this.database.collection(collection).findOne( { [key]: value, [key]: value });
    }

    async seederPerson():Promise<string>{
        const personData=[{
                firstname: "Thaymer",
                surname: "Portillo",
                username: "thaymerapv",
                password: "123456",
                email: "thaymerapv@gmail.com",
                dateOfBirth: new Date(),
                referralCode:randomUUID(),
                active:true
            },
            {
                firstname: "Carlos",
                surname: "Guerra",
                username: "carlos",
                password: "123456",
                email: "carlos@gmail.com",
                dateOfBirth: new Date(),
                referralCode:randomUUID(),
                active:true
            }
        ];
        const personDummy = await Promise.all<any>(personData.map(async (elem:PersonDto)=>{
            const validateEmail= await this.searchDocuments(COLLECTIONS.PERSON,'email',elem.email)
            const validateUsername= await this.searchDocuments(COLLECTIONS.PERSON,'username',elem.username)
            if (validateUsername === null || validateEmail ===null){
                return elem;
            }
        }))

        this.seedersPerson = personDummy.filter((elem:PersonDto)=> elem != null);
        if (this.seedersPerson.length > 0){
           await this.database.collection(COLLECTIONS.PERSON).insertMany(this.seedersPerson)
           return 'seeders in person execute successful'
        }
        return 'not aggregate new seeders in person'
    }

    async generateSeeders(){
        await this.connect();
        const person:string = await this.seederPerson();
        logger.log('info',person)
        return 'create seeders successful'
    }
}