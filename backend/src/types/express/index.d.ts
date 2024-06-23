import { User } from '../../interfaces/userInterface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}