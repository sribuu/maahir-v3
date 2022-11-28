export interface IGetSupplierProfileRequest {}
export interface IGetSupplierProfileSuccessResponse {
  //   id: 1;
  //   detail: {
  //     bank_name_holder: "Feril";
  //     bank_account: "123456";
  //     category_id: 76;
  //     category_name: "Makanan";
  //     bank_id: 78;
  //     bank_name: "BNI";
  //   };
  //   name_initial: "F";
  //   name: "Feril B";
  //   email: "feril@sribuu.id";
  //   is_verified: true;
  id: number;
  detail: {
    bank_name_holder: string;
    bank_account: string;
    category_id: number;
    category_name: string;
    bank_id: number;
    bank_name: string;
  };
  name_initial: string;
  name: string;
  email: string;
  is_verified: boolean;
}

export interface IGetSupplierProfileErrorResponse {
  error_code: string;
  message: string;
}
