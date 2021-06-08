import { Package } from '../../domain/model/packages/Package'
import { PackageDto } from '../../domain/model/packages/package.dto'

export interface PackageServiceInterface{
    save(schema:PackageDto): Promise<Package>
}