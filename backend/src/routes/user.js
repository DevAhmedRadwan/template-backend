const passport = require("passport");
const { Router } = require("express");
const userController = require("../controllers/user");
const { basicGuard } = require("../middlewares/guards");

/******************************* initializing *********************************/
const router = Router();

/************************************ Routes **********************************/

// create user => register user
router.post("", userController.create);

// login user
router.post("/login", passport.authenticate("local"), userController.login);

// logout user
router.post("/logout", basicGuard, userController.logout);

/************************************ Exports **********************************/
module.exports = router;
