import moduleAlias from 'module-alias';
import path from 'path';

const dev = process.env.NODE_ENV !== 'development';

const pathGen:(folder:string)=>string = ((folder) => (!dev
  ? path.resolve(process.cwd(), 'build', 'src', folder)
  : path.resolve(process.cwd(), 'src', folder)
));

moduleAlias.addAliases({
  '@database': pathGen('database'),
  '@root': pathGen('.'),
  '@utils': pathGen('utils'),
});
