const updateUser = async (req, res, next) => {
  req.user.id !== req.params.id && console.log(req.user.id, req.params.id);
};

module.exports = { updateUser };
