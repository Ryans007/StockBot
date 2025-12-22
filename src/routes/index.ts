import express from "express";
import conversationRouter from "./conversationRouter";
import itemRouter from "./itemRouter.ts";
import recipeRouter from "./recipeRouter.ts";

const router = (app: express.Router) => {
  app.use("/assistant", conversationRouter);
  app.use("/items", itemRouter);
  app.use("/recipes", recipeRouter);
}

export default router;