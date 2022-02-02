async function del(userId, models) {
  return await models.user.deleteUserAndAllPossessions(userId);
}

module.exports = del;
