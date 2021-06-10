import express, { Request, Response, NextFunction } from 'express';
import TYPES from '../../types';
import container from '../../inversify.config';
import { PackageServiceInterface } from '../../kiddkeo/party/aplication/service/PackageService.interface';
import { PackageDto } from '../../kiddkeo/party/domain/model/packages/package.dto';

const router = express.Router();

router.post('/package', async (req:Request, res:Response, next:NextFunction) => {
  const { entity } = req.body;
  const packageService = container.get<PackageServiceInterface>(TYPES.PackageService);
  try {
    const savePackage = await packageService.save(entity);

    res.status(201).json({
      status: 201,
      package: savePackage.toJson(),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/package', async (req:Request, res:Response, next: NextFunction) => {
  const packageService = container.get<PackageServiceInterface>(TYPES.PackageService);
  try {
    const findPackage = await packageService.findAll();
    res.status(200).json({
      status: 200,
      package: findPackage,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/package/:id', async (req:Request, res:Response, next: NextFunction) => {
  const { id } = req.params;
  const packageService = container.get<PackageServiceInterface>(TYPES.PackageService);
  try {
    const findPackage = await packageService.find(id);
    res.status(200).json({
      status: 200,
      package: findPackage,
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/package/:id', async (req:Request, res:Response, next:NextFunction) => {
  const { id } = req.params
  const { entity } = req.body

  const packageService = container.get<PackageServiceInterface>(TYPES.PackageService);
  try {
    const updatePackage = await packageService.update(entity, id);

    res.status(201).json({
      status: 201,
      package: 'Se ha actualizado con exito',
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/package/:id', async (req:Request, res:Response, next: NextFunction) => {
    const { id } = req.params

    const packageService = container.get<PackageServiceInterface>(TYPES.PackageService)

    try{
        const deletePackage = await packageService.delete(id)

        res.status(200).json({
          status: 200,
          package: 'Se ha eliminado el paquete con éxito'
        })
    }
    catch(err){
        next(err)
    }
})

export default router;
