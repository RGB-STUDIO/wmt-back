import express from 'express';

import init from './init';
import routes from './api/routes';

const app = express();

init(app);

app.use(routes);

export default app;
