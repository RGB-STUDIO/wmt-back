import express, { Request, Response, NextFunction } from 'express';
import TYPES from '@root/types';
import container from '@root/inversify.config';
import { validatePost } from '@root/api/routes/validators/autentication.validator';
import {AuthenticationServiceInterface} from "@root/kiddkeo/user/application/Autentication/servicio/AuthenticationService.interface";
import {MailerInterface} from "@utils/mailer/Mailer.interface";

const router = express.Router();
// @ts-ignore
router.post('/register', [validatePost, async (req:Request, res:Response, next:NextFunction) => {
  const { entity } = req.body;
  const authService = container
    .get<AuthenticationServiceInterface>(TYPES.AuthenticationService);
  const mailerService = container.get<MailerInterface>(TYPES.MailerService)
  try {
    const registerUser = await authService.register(entity);
    await mailerService.sendVerificationEmail(registerUser,req,res)
  } catch (err) {
    next(err);
  }
}]);

router.post('/login',async (req:Request,res:Response,next:NextFunction)=>{
  const { email, password } = req.body;
  const authService = container
      .get<AuthenticationServiceInterface>(TYPES.AuthenticationService);
  try {
    const loginUser = await authService.login(email,password);
    res.status(200).json({
      status: 200,
      user: loginUser.toLoginDto(),
    });
  }catch (err) {
    next(err);
  }
});

router.get('/verify/:token',async (req:Request,res:Response,next:NextFunction)=>{
  const {token}=req.params;
  const authService = container
      .get<AuthenticationServiceInterface>(TYPES.AuthenticationService);
  try {
    const user=await authService.verifyUser(token);
    console.log(user);
    res.status(200).json({
      status: 200,
      message:'La cuenta ha sido verificada.',
      user: user.toLoginDto(),
    });
  }catch (err) {
    next(err)
  }
})
export default router;
