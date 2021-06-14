import express, { Request, Response, NextFunction } from 'express';
import TYPES from '@root/types';
import container from '@root/inversify.config';
import { validatePost } from '@root/api/routes/validators/autentication.validator';
import {PersonServiceInterface} from "@root/kiddkeo/user/application/Person/Service/PersonService.interface";

const router = express.Router();
// @ts-ignore
router.post('/register', [validatePost, async (req:Request, res:Response, next:NextFunction) => {
  const { entity } = req.body;
  const personService = container
    .get<PersonServiceInterface>(TYPES.PersonService);
  try {
    const registerUser = await personService.save(entity);
    res.status(200).json({
      status: 200,
      user: registerUser.toJson(),
    });
  } catch (err) {
    next(err);
  }
}]);

export default router;
