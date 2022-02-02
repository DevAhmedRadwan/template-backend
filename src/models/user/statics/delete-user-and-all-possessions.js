module.exports = function deleteUserAndAllPossessions(id) {
  return this.deleteOne({ _id: id });
};
