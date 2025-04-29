import express from "express";
import config from "./config.js";
import { connectToMongoDB } from "./db.js";
import cookieParser from "cookie-parser";

// Import Routers and Global Handlers
import { errorHandler } from "./middlewares/commonMiddlewares.js";
import productsRouter from "./routes/products.routes.js"
import cartRouter from "./routes/cart.routes.js"
import userRouter from "./routes/user.routes.js"

// App Initialization
const app = express();
const port = config.port;

app.use(express.json());
app.use(cookieParser());

// Logger Middleware
app.use((req, res, next) => {
    try {
        res.on("finish", () => {
            // Log the request method, URL, and response status code when the response is finished
            console.log(
                `[${req.method}] ${req.originalUrl} -> ${res.statusCode}`
            );
        });
        next();
    } catch (err) {
        throw new Error(err.message ? err.message : "something went wrong");
    }
});

// Health Check Route
app.get("/health-check", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "health check successful",
        });
    } catch (err) {
        throw new Error(err.message ? err.message : "something went wrong");
    }
});

//

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);

// Error Middleware
app.use(errorHandler);

// Not-found Middleware
app.use((req, res) => {
    try {
        res.status(404).json({
            success: false,
            message: "route not found",
        });
    } catch (err) {
        throw new Error(err.message ? err.message : "something went wrong");
    }
});

// Server Initialization
const server = app.listen(port, () => {
    const host = server.address().address; // Get the server address
    const port = server.address().port; // Get the server port
    console.log(
        `Server running at http://${host === "::" ? "localhost" : host}:${port}`
    );
    connectToMongoDB()
});