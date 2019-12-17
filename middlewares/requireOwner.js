// Specify requireLogin to allow only owner user edit/delete article
module.exports = (req, res, next) => {
  if (req.user !== req.body._user) {
    return res.status(401).send({ error: 'You can not edit this document!' });
  }

  next();
};
