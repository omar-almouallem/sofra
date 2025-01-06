export interface IUserSchema {
  _id: string;
  email: string;
  first_name:string,
  last_name:string,
  password: string;
  role: string;
  refreshToken?: string;
}
