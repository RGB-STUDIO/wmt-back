import { CustomExternalError } from '@utils/CustomExternalError';
import { validateEmptyBody, validateFieldsInBody } from '@utils/helpers';
import { PackageDto } from '../../../kiddkeo/admin/domain/model/packages/package.dto'
import { NextFunction } from 'express';

export const validatePackage = (req: Request, res: Response, next: NextFunction) => {
      // @ts-ignore
    const { entity } = req.body

      // @ts-ignore
    if(validateEmptyBody(req.body) 
        || entity.title
        || entity.price
        || entity.activate
        || entity.position
        ){
            throw new CustomExternalError({
                message: 'require fields',
                errors: [{
                    resource: 'Party',
                    field: 'body empty',
                    code: 'unprocessable',
                }]
            },{
                code: 400
            })
        }

  if (validateFieldsInBody<PackageDto>(entity)) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new CustomExternalError({
      message: 'required fields',
      errors: [{
        resource: 'admin',
        field: 'body fields',
        code: 'unprocessable',
      }],
    }, {
      code: 400,
    });
  }
  next();
}