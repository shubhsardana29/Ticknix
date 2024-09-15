import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler';

interface DecodedToken {
  userId: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

// Authentication middleware to verify JWT token
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('No token provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
};

// Authorization middleware to check for admin role
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError('Not authenticated', 401);
  }

  if (req.user.role !== 'admin') {
    throw new AppError('Access denied', 403);
  }

  next();
};
