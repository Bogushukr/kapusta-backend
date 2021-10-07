const { Schema, model } = require("mongoose");

const transactionSchema = Schema(
  {
    desc: {
      type: String,
      maxLength: 30,
    },
    value: {
      type: Number,
      default: 0,
    },
    cashIncome: {
      type: Boolean,
    },
    expenseCategories: {
      type: String,
      default: "null",
    },
    incomeCategories: {
      type: String,
      default: "null",
    },
    year: {
      type: String,
      default: "",
    },
    month: {
      type: String,
      default: "",
    },
    day: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timeStamps: true }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
