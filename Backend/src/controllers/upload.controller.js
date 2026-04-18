// controllers/upload.controller.js


import excelService from "../services/excel.service.js";
import boschStockModel from "../models/boschStock.model.js";
import companyStockModel from "../models/companyStock.model.js";
import fs from "fs";

export const uploadExcel = async (req, res) => {
  try {
    const user = req.user;

    const boschFile = req.files?.bosch?.[0];
    const companyFile = req.files?.company?.[0];

    if (!boschFile && !companyFile) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    if (boschFile) {
      await excelService.importExcel(boschFile.path, boschStockModel);
      fs.unlinkSync(boschFile.path); // 🧹 cleanup
    }

    if (companyFile) {
      await excelService.importExcel(companyFile.path, companyStockModel);
      fs.unlinkSync(companyFile.path);
    }

    res.json({ message: "Stock updated successfully ✅", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
