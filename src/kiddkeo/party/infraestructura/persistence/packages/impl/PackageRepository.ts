import { Db, ObjectID } from 'mongodb';
import { PackageRepositoryInterface } from '../PackageRepository.interface';
import { PackageDto } from '../../../../domain/model/packages/package.dto';
import { PackageCollection } from '../types/PackageCollection';

export class PackageRepository implements PackageRepositoryInterface {
  private database: Db;

  constructor(database:Db) {
    this.database = database;
  }

  async save(schema:PackageDto): Promise<PackageCollection> {
    const packageSnapshot = await this.database.collection('package').insertOne(schema);
    return packageSnapshot.ops[0];
  }

  async findAll(): Promise<PackageCollection[]> {
    return this.database.collection('package').find({}).toArray();
  }

  async find(uid:string): Promise<PackageCollection> {
    return this.database
      .collection('package')
      .findOne({ _id: new ObjectID(uid) });
  }

  async update(schema: PackageDto): Promise<PackageCollection> {
    if (!schema.uid) {
      throw new Error('uid is undefined');
    }
    await this.database.collection('package').updateOne({ _id: new ObjectID(schema.uid) }, {
      $set: {
        title: schema.title,
        price: schema.price,
        description: schema.description,
      },
    });
    return this.find(schema.uid);
  }

  async delete(uid: string):Promise<PackageCollection> {
    const packageSnapshot = await this.find(uid);
    await this.database.collection('package').deleteOne({ _id: new ObjectID(uid) });
    return packageSnapshot;
  }
}
