const { Router } = require("express");
/****************************** Required routes  ******************************/
const user = require("./user");
/******************************* initializing *********************************/
const router = Router();
/************************************ Routes **********************************/
router.use("/user", user);
/************************************ Exports **********************************/
module.exports = router;
