import { PackageDto } from '../../../domain/model/packages/package.dto'
import { PackageCollection } from './types/PackageCollection'

export interface PackageRepositoryInterface {
    save(schema:PackageDto): Promise<PackageCollection>
}
