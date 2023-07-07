import { Request, Response, NextFunction } from 'express';

const authorizationMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user has any of the allowed roles
    const userRoles: string[] = req.body.userRoles;

    const hasAllowedRole = userRoles.some((role) => allowedRoles.includes(role));
    if (!hasAllowedRole) {
      return res.status(403).json({ message: 'Authorization failed. User does not have the required role' });
    }

    next();
  };
};

export default authorizationMiddleware;
