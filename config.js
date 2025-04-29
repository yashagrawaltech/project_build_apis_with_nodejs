import dotenv from "dotenv";
dotenv.config();

// Configuration object to hold application settings
const config = {
    port: process.env.PORT || 3001, // Set the port from environment variable or default to 3001
    nodeEnv: process.env.NODE_ENV.toString() || "development", // Set the node environment from environment variable or default to 'development'
    mongodb_uri: process.env.MONGODB_URI.toString(), // Set the mongodb connection string from environment variable
    jwt_secret: process.env.JWT_SECRET.toString()
};

export default config;
