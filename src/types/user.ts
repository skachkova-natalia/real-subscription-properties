export interface User {
  username: string;
  password: string;
}

export interface UserExtended extends User{
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}
