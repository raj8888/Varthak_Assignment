import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt, { decode } from 'jsonwebtoken';

dotenv.config();

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    // Verify and decode the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // Add user ID and roles to the request body
    req.body.userID = decoded.id;
    req.body.userRoles = decoded.roles;
    req.body.userName = decoded.name

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticationMiddleware;
