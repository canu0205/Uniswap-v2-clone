var express = require("express");
var router = express.Router();
const { swapExactTokensForTokens } = require("../controller/swapController");

/* POST swap exact tokens for tokens */
router.post("/", swapExactTokensForTokens);

module.exports = router;
