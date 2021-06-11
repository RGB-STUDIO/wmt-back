import express, { Request, Response, NextFunction } from 'express';
import { Package } from '@root/kiddkeo/party/domain/model/packages/Package';
import TYPES from '../../types';
import container from '../../inversify.config';
import { PackageServiceInterface } from '../../kiddkeo/party/aplication/service/PackageService.interface';

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
    const packages = await packageService.findAll();
    res.status(200).json({
      status: 200,
      packages: packages.map((pkg:Package) => pkg.toJson()),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/package/:uid', async (req:Request, res:Response, next: NextFunction) => {
  const { uid } = req.params;
  const packageService = container.get<PackageServiceInterface>(TYPES.PackageService);
  try {
    const findPackage = await packageService.find(uid);
    res.status(200).json({
      status: 200,
      package: findPackage,
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/package', async (req:Request, res:Response, next:NextFunction) => {
  const { entity } = req.body;
  const packageService = container.get<PackageServiceInterface>(TYPES.PackageService);
  try {
    const updatePackage = await packageService.update(entity);
    res.status(201).json({
      status: 201,
      package: updatePackage.toJson(),
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/package/:uid', async (req:Request, res:Response, next: NextFunction) => {
  const { uid } = req.params;

  const packageService = container.get<PackageServiceInterface>(TYPES.PackageService);

  try {
    const deletePackage = await packageService.delete(uid);

    res.status(200).json({
      status: 200,
      package: deletePackage.toJson(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
