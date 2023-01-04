export interface IRefreshTokenRequest {
  refresh_token: string;
}

export interface IRefreshTokenSuccessResponse {
  message: string;
  expires_in: string;
  token: string;
  refresh_token: string;
}

export interface IRefreshTokenErrorResponse {
  error_code: string;
  message: string;
}
