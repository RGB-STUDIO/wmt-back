import express, { Request, Response, NextFunction } from 'express'
import { PackageServiceInterface } from '../../kiddkeo/party/aplication/service/PackageService.interface'
import TYPES from '@root/types';
import container from '@root/inversify.config';

const router = express.Router()

router.post('/package', async (req:Request, res:Response, next:NextFunction) => {
    const { entity } = req.body
    console.log(entity)
    const packageService = container.get<PackageServiceInterface>(TYPES.PackageService)
    try{
        const savePackage = await packageService.save(entity)

        res.status(201).json({
            status: 201,
            package: savePackage.toJson()
        })
    }
    catch(err){
        next(err)
    }
})

/* router.get('/package', async (req:Request, res:Response, next: NextFunction) => {
    const packageService = container.get<PackageServiceInterface>(TYPES.PackageService)
    try{
       const findPackage = await packageService.findAll()
       res.status(200).json({
            status: 200,
            package: findPackage
        })
    }catch(err){
        next(err)
    }
}) */

router.get('/package/:id', async (req:Request, res:Response, next: NextFunction) => {
    const { id } = req.params
    const packageService = container.get<PackageServiceInterface>(TYPES.PackageService)
    try{
    const findPackage = await packageService.find(id)
       res.status(200).json({
            status: 200,
            package: findPackage
        })
    }catch(err){
        next(err)
    }
})

router.put('/package/:id', async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params
    const { entity } = req.body

    const packageService = container.get<PackageServiceInterface>(TYPES.PackageService)
    try{
        const updatePackage = await packageService.update(entity, id)

        res.status(201).json({
            status: 201,
            package: updatePackage.toJson()
        })
    }
    catch(err){
        next(err)
    }
})

export default router