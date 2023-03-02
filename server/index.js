import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.js";
import vehicleRouter from "./routes/vehicle.js";

const PORT = 8080;

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));

app.use(cors());

// test server route
app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.use("/user", userRouter);
app.use("/vehicle", vehicleRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
