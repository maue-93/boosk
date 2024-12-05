import { Request } from 'express';
import { JwtPayloadType } from './jwt.payload.type';

export interface AuthenticatedRequest extends Request {
  user: JwtPayloadType; // Ensures req.user has the correct type
}
