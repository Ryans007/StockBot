import RecipeRepository from "../repositories/Recipe.ts";
import RecipeController from "../controllers/Recipe.ts";
import {AppDataSource} from "../config/dataSource.ts";
import Recipe from "../entities/Recipe.ts";
import {Router} from "express";

const router = Router()

const typeOrmRepository = AppDataSource.getRepository(Recipe);
const recipeRepository = new RecipeRepository(typeOrmRepository);
const recipeController = new RecipeController(recipeRepository);

router.post("/", (req, res) => recipeController.create(req, res));
router.get("/", (req, res) => recipeController.list(req, res));
router.put("/:id", (req, res) => recipeController.update(req, res));
router.delete("/:id", (req, res) => recipeController.delete(req, res));

export default router;