const express =
  require("express");

const router =
  express.Router();

const {
  addSharedExpense
} = require(
  "../controllers/sharedExpenseController"
);

router.post(
  "/",
  addSharedExpense
);

module.exports = router;