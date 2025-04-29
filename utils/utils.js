import jwt from "jsonwebtoken"
import config from "../config.js";

export function decodeAuthToken(token) {
    try {
        const decodedToken = jwt.verify(token, config.jwt_secret);
        return decodedToken; // Returns decoded token data if valid
    } catch (error) {
        return null; // Returns null if token is invalid
    }
};