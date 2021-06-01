import { createLogger, format, transports } from 'winston';

const {
  combine,
  json,
  timestamp,
} = format;

export const mainLogger = createLogger({
  level: 'info',
  defaultMeta: { logger: 'Main logger' },
  transports: [
    new transports.Console({
      format: combine(timestamp(), json()),
    }),
  ],
});
