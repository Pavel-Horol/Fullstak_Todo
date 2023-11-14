import Express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import authRoutes from "./routes/Auth.route.js";
import todoRoutes from "./routes/todo.route.js"
import cors from "cors";

const app = Express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(Express.json());

app.use("/api/auth/", authRoutes);
app.use("/api/todo/", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello")
})

async function startSession() {
  try {
    await mongoose.connect(process.env.DB_LINK);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startSession();


