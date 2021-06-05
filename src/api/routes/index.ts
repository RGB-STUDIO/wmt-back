import express, {
  NextFunction, Request, Response,
} from 'express';
import { mainLogger } from '@utils/loggers';
import { CustomExternalError } from '@utils/CustomExternalError';
import authentication from '@root/api/routes/authentication';

const router = express.Router();

router.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    status: 200,
    message: `OK ${process.env.NODE_ENV}`,
  });
});

router.use('/authentication', authentication);

router.get('*', (req:Request, res:Response) => {
  res.status(404).json({
    ok: false,
    message: '[GET] the monkey dances for money and you don\'t look for what you find',
  });
});

router.post('*', (req:Request, res:Response) => {
  res.status(404).json({
    ok: false,
    message: '[POST] the monkey dances for money and you don\'t look for what you find',
  });
});

router.put('*', (req:Request, res:Response) => {
  res.status(404).json({
    ok: false,
    message: '[PUT] the monkey dances for money and you don\'t look for what you find',
  });
});

router.delete('*', (req:Request, res:Response) => {
  res.status(404).json({
    ok: false,
    message: '[DELETE] the monkey dances for money and you don\'t look for what you find',
  });
});

router.use((err: any, req: Request, res: Response, next:NextFunction) => {
  if (err instanceof CustomExternalError) {
    return res.status(err.statusCode.code).json(err);
  }

  if (res.headersSent) {
    return next(err);
  }
  mainLogger.error(`Error ${err.message}, ${err.stack}`);
  return res.status(500).json({ error: 'Server error' });
});

export default router;
