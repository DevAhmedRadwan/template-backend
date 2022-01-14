const { OK } = require("../constants/response-status");

async function create(req, res, next) {
  try {
    const { firstName, lastName, credential } = req.body;
    await req.services.user.create(
      { firstName, lastName, credential },
      req.models.user
    );
    return res.status(OK).json({ message: "User register" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  return res.status(OK).json({ message: "User loggedin" });
}

async function logout(req, res, next) {
  req.logout();
  return res.status(OK).json({message: "User loggedout"});
}

module.exports.create = create;
module.exports.login = login;
module.exports.logout = logout;
