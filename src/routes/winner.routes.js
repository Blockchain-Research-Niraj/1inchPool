const express = require("express");
const router = express.Router();

const winnerController = require("../controllers/winner.controller");

router.get("/:token/:amount?", winnerController.findAllData);

module.exports = router;
