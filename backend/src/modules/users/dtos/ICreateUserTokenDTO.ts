export interface ICreateUserTokenDTO {
  token: string;
  userId: string;
  expires_date: Date;
}
