import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";
import path from "path";
import {fileURLToPath} from "url"
import morgan from "morgan";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 9000;
const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`DB connection Successful and Serving on Port ${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did Not Connect`));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client','build')));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("*", function (req, res) {
  const index = path.join(__dirname, 'client', 'build', 'index.html');
  res.sendFile(index)
});


