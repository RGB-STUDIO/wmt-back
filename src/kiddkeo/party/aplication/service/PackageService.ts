import { inject, injectable } from 'inversify';
import ClientMongo, { MongoClientProviderInterface } from '@database/ClientMongo';
import TYPES from '@root/types';
import { Collection, Db } from 'mongodb';
import { PackageControllerInterface } from '../controllers/PackageController.interface';
import { Package } from '../../domain/model/packages/Package';
import { PackageDto } from '../../domain/model/packages/package.dto';
import { PackageServiceInterface } from './PackageService.interface';

@injectable()
export class PackageService extends ClientMongo implements PackageServiceInterface {
  private packageController!: PackageControllerInterface

  constructor(@inject(TYPES.MongoClient) mongoClient: MongoClientProviderInterface, @inject(TYPES.PackageFactory)
  private packageRepository: (database: Db) => PackageControllerInterface) {
    super(mongoClient)
  }

  private async Connect() {
    this.clientMongo = await this.connectMongo();
    this.packageController = this.packageRepository(this.database);
  }

/*   private async loadReferences(snapShot: any): Promise<Package> {
    return new Package(snapShot.uuid, snapShot.title, snapShot.number, snapShot.description)
  }
 */

  async save(schema: PackageDto): Promise<Package> {
    let packageSnapShot: any;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.save(schema);
      await this.commitTransaction();
      return new Package(packageSnapShot.uid, packageSnapShot.title, packageSnapShot.number, packageSnapShot.description)
    } catch (err) {
      await this.abortTransaction();
      throw new Error(`Ha ocurrido un error: ${err}`);
    } finally {
      await this.endSession();
    }
  }

/*   async findAll(): Promise<Collection[]> {
    let packageSnapShot: any;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.findAll();
      await this.commitTransaction();
      return packageSnapShot
    } catch (err) {
      await this.abortTransaction();
      throw new Error(`Ha ocurrido un error: ${err}`);
    } finally {
      await this.endSession();
    }
  } */

  async find(uid:string): Promise<Collection> {
    let packageSnapShot: any;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.find(uid);
      console.log(packageSnapShot)
      await this.commitTransaction();
      return packageSnapShot
    } catch (err) {
      await this.abortTransaction();
      throw new Error(`Ha ocurrido un error: ${err}`);
    } finally {
      await this.endSession();
    }
  }

  async update(schema: PackageDto, uid:string): Promise<Package> {
    let packageSnapShot: any;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.update(schema, uid);
      console.log(packageSnapShot)
      await this.commitTransaction();
      return new Package(packageSnapShot.uid, packageSnapShot.title, packageSnapShot.number, packageSnapShot.description)
    } catch (err) {
      await this.abortTransaction();
      throw new Error(`Ha ocurrido un error: ${err}`);
    } finally {
      await this.endSession();
    }
  }

  async delete(schema:PackageDto): Promise<Collection> {
    let packageSnapShot: any;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.delete(schema);
      await this.commitTransaction();
      return packageSnapShot
    } catch (err) {
      await this.abortTransaction();
      throw new Error(`Ha ocurrido un error: ${err}`);
    } finally {
      await this.endSession();
    }
  }
}
