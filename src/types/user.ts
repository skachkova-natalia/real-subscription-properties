export interface User {
  email: string;
  password: string;
}

export interface UserExtended extends User {
  name: string;
}

export interface UserFull extends UserExtended {
  user_id: number;
  is_active: boolean;
  is_verified: boolean;
  registered_at: string;
  roles: string[];
}

export interface SendChangeEmailParams {
  new_email: string;
}

export interface ChangeEmailParams {
  password: string;
  token_change: string;
}
