module.exports = {
  getError(error, propName) {
    try {
      return error.mapped()[propName].msg;
    } catch (e) {
      return '';
    }
  },
};
