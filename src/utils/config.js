// config.js
import 'dotenv/config';

export const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    frontendURL: process.env.FRONTEND_URL,
};