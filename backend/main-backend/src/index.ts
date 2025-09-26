import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
dotenv.config({
  path: "../.env",
  quiet: true,
});
const app: Application = express();
const httpServer = createServer(app);
const corsConfig = {
  origin: ["http://localhost:5173/"],
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELECT"],
};
const io = new Server(httpServer, {
  cookie: true,
  cors: corsConfig,
});
app.use(cors(corsConfig));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`main-server is listening at the port ${port} `);
});
