// config.js
import 'dotenv/config';

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    // refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    // refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
    // refreshTokenWindowMs: process.env.REFRESH_TOKEN_WINDOW_MS || 600000, // 10 minutes
};