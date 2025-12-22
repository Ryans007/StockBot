import {AppDataSource} from "../config/dataSource.ts";
import ItemRepository from "../repositories/Item.ts";
import ItemController from "../controllers/Item.ts";
import {Router} from "express";
import Item from "../entities/Item.ts";

const router = Router()

const typeOrmRepository = AppDataSource.getRepository(Item);
const itemRepository = new ItemRepository(typeOrmRepository);
const itemController = new ItemController(itemRepository);

router.post("/", (req, res) => itemController.create(req, res));
router.get("/", (req, res) => itemController.list(req, res));
router.put("/:id", (req, res) => itemController.update(req, res));
router.delete("/:id", (req, res) => itemController.delete(req, res));
