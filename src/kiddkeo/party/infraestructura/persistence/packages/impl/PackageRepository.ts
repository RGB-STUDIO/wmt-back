import { Collection, Db } from 'mongodb'
import { PackageRepositoryInterface } from '../PackageRepository.interface'
import { PackageDto } from '../../../../domain/model/packages/package.dto'
import { PackageCollection } from '../types/PackageCollection'

export class PackageRepository implements PackageRepositoryInterface {
    private database: Db

    constructor(database:Db){
        this.database = database
    }

    async save(schema:PackageDto): Promise<PackageCollection>{
        const packageSnapshot = await this.database.collection('package').insertOne(schema)
        return packageSnapshot.ops[0]
    }

/*     async findAll(): Promise<Collection[]>{
        const packageSnapshot = this.database.collection('package').find({})

        while (await packageSnapshot.hasNext()) {
            console.log(await packageSnapshot.next());

            return await packageSnapshot.next();
        }
    } */

    async find(uid:string): Promise<Collection>{

        let query = {_id: uid}

        const packageSnapshot = await this.database.collection('package').findOne(query)

        console.log(packageSnapshot)

        return packageSnapshot
    }

    async update(schema: PackageDto, uid?:string): Promise<PackageCollection>{
        uid = schema.uid

        const filter = {_id: uid}

        const packageSnapshot = await this.database.collection('package').replaceOne(filter, schema)

        return packageSnapshot.ops[0]
    }

    async delete(schema: PackageDto): Promise<Collection>{
        const packageSnapshot = await this.database.collection('package').remove({_id: schema.uid})

        return packageSnapshot.ops[0]
    }
}