const express =
  require("express");

const router =
  express.Router();

const {
  addSharedExpense
} = require(
  "../Controllers/sharedExpenseController"
);

router.post(
  "/",
  addSharedExpense
);

module.exports = router;