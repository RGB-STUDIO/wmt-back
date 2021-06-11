import { Collection, Db } from 'mongodb';
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
    return this.packageRepository.save(schema);
  }

  async findAll(): Promise<PackageCollection[]> {
    return this.packageRepository.findAll();
  }

  async find(uid:string):Promise<PackageCollection> {
    return this.packageRepository.find(uid);
  }

  async update(schema:PackageDto):Promise<PackageCollection> {
    return this.packageRepository.update(schema);
  }

  async delete(uid:string):Promise<PackageCollection> {
    return this.packageRepository.delete(uid);
  }
}
