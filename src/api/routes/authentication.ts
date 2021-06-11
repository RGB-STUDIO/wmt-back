import express, { Request, Response, NextFunction } from 'express';
import { RegisterServiceInterface } from '@root/kiddkeo/user/application/Register/Service/RegisterService.interface';
import TYPES from '@root/types';
import container from '@root/inversify.config';
import { validatePost } from '@root/api/routes/validators/autentication.validator';

const router = express.Router();
// @ts-ignore
router.post('/register', [validatePost, async (req:Request, res:Response, next:NextFunction) => {
  const { entity } = req.body;
  const registerService = container
    .get<RegisterServiceInterface>(TYPES.RegisterService);
  try {
    const registerUser = await registerService.save(entity);
    res.status(200).json({
      status: 200,
      user: registerUser.toJson(),
    });
  } catch (err) {
    next(err);
  }
}]);

export default router;
