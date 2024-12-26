import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebaseConfig';

export const validateToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idToken = req.headers.authorization?.split('Bearer ')[1];

      if (!idToken) {
        res.status(401).json({ error: 'No authentication token provided' });
        return;
      }

      const decodedToken = await auth.verifyIdToken(idToken);
      
      (req as any).user = decodedToken;
      
      next();
    } catch (error) {
      res.status(403).json({ 
        error: 'Unauthorized',
        message: error instanceof Error ? error.message : 'Invalid token' 
      });
    }
  };
};