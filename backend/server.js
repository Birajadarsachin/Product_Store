import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app=express();

const PORT = process.env.PORT || 5000

app.use(express.json());
//allows to accept JSON data in the req.body

app.use("/api/products",productRoutes);
app.use("/api/auth", authRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, ()=>{
    connectDB();
    console.log("server started at http://localhost:"+ PORT);
});