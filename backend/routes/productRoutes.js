import express from "express";
import { getProducts} from "../controllers/productsController.js";
const ProductsRouter = express.Router()

ProductsRouter.get('/', getProducts)

export default ProductsRouter