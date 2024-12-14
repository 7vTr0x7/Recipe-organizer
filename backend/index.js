import express from "express";
import cors from "cors";
import { initializeDatabase } from "./db/db.connection.js";
import { config } from "dotenv";
import userRouter from "./routes/user.js";

const app = express();
app.use(express.json());
config();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://recipe-organizer-frontend.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/user", userRouter);

initializeDatabase();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
