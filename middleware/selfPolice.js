function selfPolice(roles) {
  return (req, res, next) => {
    let { role } = req.user;
    let { id } = req.params;
    if (id == req.user.id || roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'Not allowed.' });
    }
  };
}

export default selfPolice;
