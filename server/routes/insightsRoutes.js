const express=require("express");
const  getInsights  =require("../controllers/insightController.js");
const protect=require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/insights", protect, getInsights);

module.exports = router;