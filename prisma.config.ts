import { config } from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config();

export default {
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
};
