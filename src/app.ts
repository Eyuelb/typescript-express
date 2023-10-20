import express from "express";
import morgan from 'morgan';

import { errorHandler } from "./middleware/errorHandler.middleware";
import {ExamplesRouter,PostsRouter} from "./routes";
import cors from "cors";

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// // Use the route modules
app.use("/api", ExamplesRouter); 
app.use('/api/posts', PostsRouter);

// Add the error handling middleware
app.use(errorHandler);

export default app;
