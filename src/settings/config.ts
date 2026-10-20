import 'dotenv/config';

const env = process.env;

export const ADMIN_USERNAME = env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'qwerty';

export const SETTINGS = {
  PORT: env.PORT || 5001,
  MONGODB_URI: env.MONGODB_URI || 'mongodb://0.0.0.0:27017/blogger-platform',
  DB_NAME: env.DB_NAME || 'blogger-platform',
};
