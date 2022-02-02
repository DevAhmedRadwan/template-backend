const passport = require("passport");
const { Router } = require("express");
const user = require("../controllers/user");
const { basicGuard, loginGuard } = require("../middlewares/guards");

/******************************* initializing *********************************/
const router = Router();

/************************************ Routes **********************************/
// get user
router.get("", basicGuard, user.get);

// create user => register user
router.post("", user.create);

// update user
router.put("", basicGuard, user.update);

// delete user
router.delete("", basicGuard, user.delete);

// login user
router.post("/login", loginGuard, passport.authenticate("local"), user.login);

// logout user
router.post("/logout", basicGuard, user.logout);

/************************************ Exports **********************************/
module.exports = router;
