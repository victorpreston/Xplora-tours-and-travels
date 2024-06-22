import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};

export default adminOnly;