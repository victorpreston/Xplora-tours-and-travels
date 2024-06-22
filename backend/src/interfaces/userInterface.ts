export interface User {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  accountStatus: string;
  isNotified: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}