import { Db, MongoError } from 'mongodb';
import { CustomExternalError } from '@utils/CustomExternalError';
import { PackageControllerInterface } from './PackageController.interface';
import { PackageRepositoryInterface } from '../../infraestructura/persistence/packages/PackageRepository.interface';
import { PackageRepository } from '../../infraestructura/persistence/packages/impl/PackageRepository';
import { PackageDto } from '../../domain/model/packages/package.dto';
import { PackageCollection } from '../../infraestructura/persistence/packages/types/PackageCollection';

export class PackageController implements PackageControllerInterface {
  private packageRepository: PackageRepositoryInterface;

  constructor(database: Db) {
    this.packageRepository = new PackageRepository(database);
  }

  async save(schema: PackageDto): Promise<PackageCollection> {
    try {
      return await this.packageRepository.save(schema);
    } catch (err) {
      if (err instanceof MongoError) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new CustomExternalError({
          message: err.message,
          errors: [{
            resource: 'Package',
            field: 'schema',
            code: err.code,
          }],
        }, {
          code: 400,
        });
      }
      throw new Error(err);
    }
  }

  async findAll(): Promise<PackageCollection[]> {
    return this.packageRepository.findAll();
  }

  async find(uid:string):Promise<PackageCollection> {
    const packageSnapshot:PackageCollection = await this.packageRepository.find(uid);
    // eslint-disable-next-line no-underscore-dangle
    if (packageSnapshot === null) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new CustomExternalError({
        message: 'Package not fount',
        errors: [{
          resource: 'Package',
          field: 'schema',
          code: '1',
        }],
      }, {
        code: 204,
      });
    }
    return packageSnapshot;
  }

  async update(schema:PackageDto):Promise<PackageCollection> {
    if (!schema.uid) {
      throw new Error('uid is undefined');
    }
    await this.packageRepository.update(schema);
    return this.packageRepository.find(schema.uid);
  }

  async delete(uid:string):Promise<PackageCollection> {
    const packageSnapshot:PackageCollection = await this.packageRepository.find(uid);
    await this.packageRepository.delete(uid);
    return packageSnapshot;
  }
}
