export interface IUploadSupplierProductImageSuccessResponse {
  message: string;
}

export interface IUploadSupplierProductImageRequest {
  product_id: number;
  position: number;
  file_format: string;
  file_content: string;
}

export interface IUploadSupplierProductImageErrorResponse {
  error_code: string;
  message: string;
}
