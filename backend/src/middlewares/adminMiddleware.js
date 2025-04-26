export const adminMiddleware = async (req, res, next) => {
    try {
      // req.user is available from the authMiddleware that should run before this middleware
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }
  
      // Check if user has admin role
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Access denied. Admin privileges required.' 
        });
      }
  
      // User is admin, proceed to next middleware or controller
      next();
    } catch (error) {
      console.error('Admin middleware error:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };