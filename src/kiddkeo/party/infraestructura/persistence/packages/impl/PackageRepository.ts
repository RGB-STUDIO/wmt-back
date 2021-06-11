import {
  Db, DeleteWriteOpResultObject, ObjectID, UpdateWriteOpResult,
} from 'mongodb';
import { COLLECTIONS } from '@root/Constants';
import { PackageRepositoryInterface } from '../PackageRepository.interface';
import { PackageDto } from '../../../../domain/model/packages/package.dto';
import { PackageCollection } from '../types/PackageCollection';

export class PackageRepository implements PackageRepositoryInterface {
  private database: Db;

  constructor(database:Db) {
    this.database = database;
  }

  async save(schema:PackageDto): Promise<PackageCollection> {
    const packageSnapshot = await this.database.collection(COLLECTIONS.PACKAGE).insertOne(schema);
    return packageSnapshot.ops[0];
  }

  async findAll(): Promise<PackageCollection[]> {
    return this.database.collection(COLLECTIONS.PACKAGE).find({}).toArray();
  }

  async find(uid:string): Promise<PackageCollection> {
    return this.database
      .collection(COLLECTIONS.PACKAGE)
      .findOne({ _id: new ObjectID(uid) });
  }

  async update(schema: PackageDto): Promise<UpdateWriteOpResult> {
    return this.database.collection(COLLECTIONS.PACKAGE)
      .updateOne({ _id: new ObjectID(schema.uid) }, {
        $set: {
          title: schema.title,
          price: schema.price,
          description: schema.description,
        },
      });
  }

  async delete(uid: string): Promise<DeleteWriteOpResultObject> {
    return this.database.collection(COLLECTIONS.PACKAGE).deleteOne({ _id: new ObjectID(uid) });
  }
}
