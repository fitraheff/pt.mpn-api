import jwt from "jsonwebtoken";
import { config } from "./config.js";

export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        config.accessTokenSecret,
        { expiresIn: config.accessTokenExpiration }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.accessTokenSecret);
    } catch (error) {
        throw new ResponseError(401, "Invalid token");
    }
};