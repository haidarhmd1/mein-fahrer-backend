import { UserRole } from './user';

export type JwtPayload = {
  id: string;
  email: string;
  role: UserRole;
};
