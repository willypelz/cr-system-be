export interface UserData {
  username: string;
  email: string;
  token: string;
  role?: string;
}

export interface UserRO {
  user: UserData;
}