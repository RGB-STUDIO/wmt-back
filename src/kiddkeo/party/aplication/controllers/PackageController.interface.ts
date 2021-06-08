import { PackageDto } from '../../domain/model/packages/package.dto'
import { PackageCollection } from '../../infraestructura/persistence/packages/types/PackageCollection'

export interface PackageControllerInterface{
    save(schema: PackageDto): Promise<PackageCollection>
}