var express = require("express");
var router = express.Router();

var PolicyController = require("../controllers/policy.controller");

router.get("/policies", PolicyController.getPolicies);

module.exports = router;
