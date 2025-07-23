// middlewares/roleMiddleware.js

module.exports = function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({ message: 'No role assigned to user' });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    next();
  };
};
