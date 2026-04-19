import boschStockModel from "../models/boschStock.model.js";
import companyStockModel from "../models/companyStock.model.js";

const buildSearchQuery = (search) => {
  if (!search) return {};

  const tokens = search.trim().split(/\s+/);

  const andConditions = tokens.map((token) => {
    // escape each character individually, then join with \s* (optional whitespace only)
    // dot stays as \. so "3.5L" ≠ "35L" — they are different
    const regex = token
      .split("")
      .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("\\s*"); // only allow optional whitespace between chars

    return {
      $or: [
        { itemName: { $regex: regex, $options: "i" } },
        { partno: { $regex: regex, $options: "i" } },
        { sno: { $regex: regex, $options: "i" } },
        { description: { $regex: regex, $options: "i" } },
        { sheetName: { $regex: regex, $options: "i" } },
      ],
    };
  });

  return { $and: andConditions };
};

export const getBoschStock = async (req, res) => {
  try {
    // 1. Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const startIndex = (page - 1) * limit;

    // 2. Build search query
    let query = buildSearchQuery(search);

    // 3. Fetch data and count total documents simultaneously for performance
    const [boschStock, totalDocuments] = await Promise.all([
      boschStockModel
        .find(query)
        .sort({ updatedAt: -1 }) // Sort by latest updated
        .skip(startIndex)
        .limit(limit),
      boschStockModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);

    // 4. Send response with pagination metadata
    res.status(200).json({
      message: "Bosch stock fetched successfully",
      boschStock,
      pagination: {
        totalDocuments,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in getBoschStock:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCompanySheets = async (req, res) => {
  try {
    const companySheets = await companyStockModel.distinct("sheetName");
    res.status(200).json({
      message: "Company sheets fetched successfully",
      companySheets,
    });
  } catch (error) {
    console.error("Error in getCompanySheets:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCompanyStock = async (req, res) => {
  try {
    const { sheetName } = req.params;

    // 1. Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const startIndex = (page - 1) * limit;

    // 2. Base query — always filter by sheetName from route param
    let query = buildSearchQuery(search);
    query.sheetName = sheetName;

    // 4. Fetch data and total count in parallel
    const [companyStock, totalDocuments] = await Promise.all([
      companyStockModel
        .find(query)
        .sort({ updatedAt: -1 })
        .skip(startIndex)
        .limit(limit),
      companyStockModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);

    // 5. Send response with pagination metadata
    res.status(200).json({
      message: "Company stock fetched successfully",
      companyStock,
      pagination: {
        totalDocuments,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in getCompanyStock:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const masterSearch = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const startIndex = (page - 1) * limit;
    const query = buildSearchQuery(search);

    const [bosch, company] = await Promise.all([
      boschStockModel
        .find(query)
        .select("itemName partno")
        .limit(limit)
        .lean(),

      companyStockModel
        .find(query)
        .select("itemName partno sheetName")
        .limit(limit)
        .lean(),
    ]);

    // 🔥 merge + tag source
    const results = [
      ...bosch.map((item) => ({ ...item, source: "bosch" })),
      ...company.map((item) => ({ ...item, source: "company" })),
    ];

    res.json({
      results,
      total: results.length,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};