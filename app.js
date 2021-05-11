import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import { showState } from "./src/controllers/roadtrip";
import {
  serializeErrorResponse,
  serializeMetaResponse,
} from "./src/utils/json";

const withErrorsHandled = (fn) => {
  return async (req, res, next) => {
    try {
      return await Promise.resolve(fn(req, res, next));
    } catch (err) {
      console.error(err);

      return res
        .status(err.status || 500)
        .json(serializeErrorResponse(err, err.status));
    }
  };
};

const app = express();
const corsOptions = { origin: "*" };

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health Check
app.get("/api/status", (_req, res) => {
  res.json(serializeMetaResponse({ status: "ok" }));
});

// States
app.get("/api/roadtrip", showState);
app.post("/api/roadtrip/:state", showState);

export const handler = serverless(app);
