const express = require("express");
const router = express.Router();

const swapController = require("../controllers/swap.controller");

router.get("/:fromTokenAddress/:toTokenAddress/:amount/:fromAddress/:slippage", swapController.get);

module.exports = router;
