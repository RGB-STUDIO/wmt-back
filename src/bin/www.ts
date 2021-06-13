import 'reflect-metadata';
import '../utils/module-alias';
import http from 'http';
import { createHttpTerminator } from 'http-terminator';
import { normalizePort } from '@utils/helpers';
import { mainLogger as logger } from '@utils/loggers';
import { Schema } from '@database/Schema';
import container from '@root/inversify.config';
import { MongoClientProviderInterface } from '@database/ClientMongo';
import TYPES from '@root/types';
import app from '../app';
import {Seeders} from "@database/Seeders";

const port = normalizePort(process.env.PORT || '3000');
const mongoClient = container.get<MongoClientProviderInterface>(TYPES.MongoClient);
const createModels = new Schema(mongoClient);
const generateSeeders = new Seeders(mongoClient);

createModels.createModels().then((res:any) => {
  if (res.numbers > 0) {
    logger.log('info', `Collections created ${res.numbers}`);
  }
});

generateSeeders.generateSeeders().then((res)=>{
  logger.log('info', res);
})

// Get port from environment and store in Express.
app.set('port', port);

// Create HTTP server.

const server = http.createServer(app);
const httpTerminator = createHttpTerminator({ server });

interface HttpError extends Error {
  syscall: string;
  code: string;
  [key: string]: any;
}
// Listen on provided port, on all network interfaces.
const onError = (error: HttpError) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.log('info', `Listening on ${bind}`);
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "error" event.
process.on('SIGTERM', async () => {
  logger.log(
    'info',
    'Got SIGTERM (docker container stop). Terminating gracefully',
  );
  await httpTerminator.terminate();
  logger.log('info', 'HTTP connections terminated');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.log('info', 'Got SIGINT (ctrl-C). Terminating gracefully');
  await httpTerminator.terminate();
  logger.log('info', 'HTTP connections terminated');
  process.exit(0);
});
