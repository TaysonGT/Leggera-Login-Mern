import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: SessionUser
}

export interface SessionUser {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {

  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    console.error('Authentication error:');
    res.status(401).json({ error: 'Unauthorized' });
    return
  }

  const verified = jwt.verify(token, process.env.JwtSecret!)

  if (!verified) {
    console.error('Invalid Token:');
    res.status(401).json({ error: 'Unauthorized' });
    return
  }

  const user = jwt.decode(token) as IUser

  req.user = {
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  next();
};
