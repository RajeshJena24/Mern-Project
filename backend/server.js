import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());

// Use your product routes under /api/products
app.use("/api/products", productRoutes);

// Serve frontend assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    app.get('/*path', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});


} else {
    // Basic route for development
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database", err);
    process.exit(1);
});
