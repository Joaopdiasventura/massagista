import { Request } from "express";
import { User } from "../../domain/user/entities/user.entity";
export interface AuthenticatedRequest extends Request {
  user: User;
}
