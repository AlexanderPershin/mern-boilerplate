// Specify requireLogin to allow only logged in users view page
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.send({ msg: 'You must log in!' });
  }

  next();
};
