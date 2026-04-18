import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getBoschStock, getCompanySheets, getCompanyStock, masterSearch } from "../controllers/getStock.controller.js";

const getStockRouter = Router()

/**
 * @route GET /api/getStock/boschStock
 * @description Get Bosch stock
 * @access Private
 */
getStockRouter.get("/boschStock", isAuthenticated, getBoschStock)

/**
 * @route GET /api/getStock/company-sheets
 * @description Get company sheets
 * @access Private
 */
getStockRouter.get("/company-sheets", isAuthenticated, getCompanySheets)

/**
 * @route GET /api/getStock/company-stock/:sheetName
 * @description Get company stock by sheetId
 * @access Private
 */
getStockRouter.get("/company-stock/:sheetName", isAuthenticated, getCompanyStock)

/**
 * @route GET /api/getStock/master-search
 * @description Master search across Bosch and Company stock
 * @access Private
 */
getStockRouter.get("/master-search", isAuthenticated, masterSearch)

export default getStockRouter;