import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token); // Debugging line

  if (!token) {
    return res.status(401).send({ error: 'Access denied, no token provided.' });
  }

  try {
    console.log('Verifying token:', token); // Step 4: Log the token before verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    (req as any).user = decoded;
    console.log('Decoded JWT:', decoded); // Debugging line to ensure token is decoded
    next();
  } catch (err: any) {
      console.error('Token verification error:', err.message); // Step 5: Log detailed error message
      res.status(400).send({ error: 'Invalid token.' });
  }
};

export default auth;