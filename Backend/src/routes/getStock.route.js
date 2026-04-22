import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getBoschStock, getCompanySheets, getCompanyStock, masterSearch } from "../controllers/getStock.controller.js";
import { cacheMiddleware } from "../middleware/cache.middleware.js";

const getStockRouter = Router()

/**
 * @route GET /api/getStock/boschStock
 * @description Get Bosch stock — cached 2 mins
 * @access Private
 */
getStockRouter.get("/boschStock", isAuthenticated, cacheMiddleware(120), getBoschStock)

/**
 * @route GET /api/getStock/company-sheets
 * @description Get company sheets — cached 1 hour (changes only on Excel upload)
 * @access Private
 */
getStockRouter.get("/company-sheets", isAuthenticated, cacheMiddleware(3600), getCompanySheets)

/**
 * @route GET /api/getStock/company-stock/:sheetName
 * @description Get company stock by sheetId — cached 2 mins
 * @access Private
 */
getStockRouter.get("/company-stock/:sheetName", isAuthenticated, cacheMiddleware(120), getCompanyStock)

/**
 * @route GET /api/getStock/master-search
 * @description Master search across Bosch and Company stock — cached 2 mins
 * @access Private
 */
getStockRouter.get("/master-search", isAuthenticated, cacheMiddleware(120), masterSearch)

export default getStockRouter;