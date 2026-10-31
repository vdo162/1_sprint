import 'dotenv/config';

const env = process.env;

export const SETTINGS = {
  PORT: env.PORT || 5001,
  MONGODB_URI: env.MONGODB_URI || 'mongodb://0.0.0.0:27017/blog-platform',
  DB_NAME: env.DB_NAME || 'blog-platform',
  ADMIN: {
    LOGIN: env.ADMIN_LOGIN || 'admin',
    PASSWORD: env.ADMIN_PASSWORD || 'qwerty',
  },
};
