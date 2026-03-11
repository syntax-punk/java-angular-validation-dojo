export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoggedInUser {
  username: string;
  token: string;
}
