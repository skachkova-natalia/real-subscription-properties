export interface User {
  username: string;
  password: string;
}

export interface UserExtended extends User{
  email: string;
}
