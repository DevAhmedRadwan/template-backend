const { OK, CREATED } = require("../constants/response-status");

async function get(req, res, next) {
  try {
    /**
     * @update
     * this will need to get the user data live
     * because jwt may be stale
     * it's ok now because it's a session
     */
    let profileDate = req.user.getProfileData();
    return res.status(OK).json({
      message: "User retrieved",
      data: profileDate,
    });
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  const { firstName, lastName, credential } = req.body;
  // create the new user
  try {
    /**
     * @update
     * need to create the personal organization
     * as one batch with the user creation
     */
    await req.services.user.create({ firstName, lastName, credential }, req.models.user);
    // send the responce
    return res.status(CREATED).json({ message: "User registered" });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  /**
   * @update
   * need to add support for image uri
   * this will still need the support of a new route to create the uri
   */
  const { firstName, lastName, credentials } = req.body;
  // update the user
  try {
    await req.services.user.update(
      req.user,
      { firstName, lastName, credentials },
      req.models.user
    );
    // send the responce
    return res.status(OK).json({ message: "User updated" });
  } catch (error) {
    return next(error);
  }
}

async function del(req, res, next) {
  const userId = req.user._id;
  try {
    /**
     * @update
     * need to remove all user refrances from other models
     * best position will be in the service
     */
    // delete the user
    await req.services.user.delete(userId, req.models);
    // logout the user
    req.logout();
    // send the responce
    return res.status(OK).json({ message: "User deleted" });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  return res.status(OK).json({ message: "User logged in" });
}

async function logout(req, res, next) {
  req.logout();
  return res.status(OK).json({ message: "User logged out" });
}

module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = del;
module.exports.login = login;
module.exports.logout = logout;
