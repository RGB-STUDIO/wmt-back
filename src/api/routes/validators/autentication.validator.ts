import { CustomExternalError } from '@utils/CustomExternalError';
import { validateEmptyBody, validateFieldsInBody } from '@utils/helpers';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { NextFunction } from 'express';

export const validatePost = (req:Request, res:Response, next:NextFunction) => {
  // @ts-ignore
  const { entity } = req.body;
  // @ts-ignore
  if (validateEmptyBody(req.body)
        || !entity
        || !entity.firstname
        || !entity.surname
      || !entity.username
      || !entity.password
      || !entity.email
      || !entity.dateOfBirth
      || !entity.referrer
  ) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new CustomExternalError({
      message: 'required fields',
      errors: [{
        resource: 'Authentication',
        field: 'body empty',
        code: 'unprocessable',
      }],
    }, {
      code: 400,
    });
  }

  if (validateFieldsInBody<RegisterDto>(entity)) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new CustomExternalError({
      message: 'required fields',
      errors: [{
        resource: 'Authentication',
        field: 'body empty',
        code: 'unprocessable',
      }],
    }, {
      code: 400,
    });
  }
  next();
};
