const SharedExpense =
  require("../models/SharedExpense");

const addSharedExpense =
  async (req, res) => {

  try {

    const {
      title,
      amount,
      group,
      paidBy,
      splitAmong
    } = req.body;

    // Split amount equally
    const share =
      amount / splitAmong.length;

    const expense =
      await SharedExpense.create({

        title,
        amount,
        group,
        paidBy,
        splitAmong,
      });

    res.status(201).json({

      expense,

      splitPerPerson:
        share,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addSharedExpense,
};