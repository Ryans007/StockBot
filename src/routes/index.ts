import express from "express";
import conversationRouter from "./conversationRouter";

const router = (app: express.Router) => {
  app.use("/assistant", conversationRouter);
}