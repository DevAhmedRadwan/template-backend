module.exports = function dependencyInjector(dependencies) {
  return async (req, res, next) => {
    Object.keys(dependencies).forEach((key) => {
      req[key] = dependencies[key];
    });
    next();
  };
};
