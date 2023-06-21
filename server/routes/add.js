var express = require("express");
var router = express.Router();
var { approve, addLiq } = require("../controller/addController");

/* POST /add/approve/:token0/:token1 */
router.post("/approve/:token0/:token1", approve);

/* POST /add/:token0/:token1 */
router.post("/:token0/:token1", addLiq);

module.exports = router;
