import { PackageDto } from './package.dto'

export class Package{
    uid:string
    title: string
    price: number
    description?: string

    constructor(uid:string, title:string, price: number, description:string){
        this.uid = uid
        this.title = title
        this.price = price
        this.description = description
    }

    toJson():PackageDto{
        return{
            uid: this.uid,
            title: this.title,
            price: this.price,
            description: this.description
        }
    }
}