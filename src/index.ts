import { setupApp } from './setup-app';
import { SETTINGS } from './settings/config';
import { db } from './db';
import express from 'express';

const bootstrap = async () => {
  const app = express();
  setupApp(app);
  const PORT = SETTINGS.PORT;

  await db.run(SETTINGS.MONGODB_URI);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });

  return app;
};

bootstrap();
