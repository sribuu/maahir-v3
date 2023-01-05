export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginSuccessResponse {
  message: string;
  maahir_user_id: number;
  account_type: string;
  expires_in: string;
  token: string;
  refresh_token: string;
}

export interface ILoginErrorResponse {
  error_code: string;
  message: string;
}
