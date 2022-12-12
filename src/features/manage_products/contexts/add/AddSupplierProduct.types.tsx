type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface InitialStateType {
  submit_validation: IAddSupplierProductSubmitValidation;
  item: IAddSupplierProductItem;
  variant: IAddSupplierProductVariant[];
  images: IAddSupplierProductImages;
}

// State Collection Types consist of:
export interface IAddSupplierProductSubmitValidation {
  status: boolean;
}

export interface IAddSupplierProductItem {
  name: {
    value: string;
  };
  category: {
    value: string;
    list: string[];
  };
  length: {
    value: string;
  };
  width: {
    value: string;
  };
  height: {
    value: string;
  };
  weight: {
    value: string;
  };
  description: {
    value: string;
  };
  availability: {
    value: string;
  };
}

export interface IAddSupplierProductVariant {
  sku: {
    placeholder: string;
    value: string;
  };
  variant: {
    placeholder: string;
    value: string;
  };
  price: {
    placeholder: string;
    value: string;
  };
  stock: {
    placeholder: string;
    value: string;
  };
  action: {
    placeholder: string;
    value: string;
  };
}

export interface IAddSupplierProductImages {
  cover_image_position: number;
  error: {
    status: boolean;
    message: string;
  };
  list: {
    base64: string;
    file_format: string;
  }[];
}

export enum AddSupplierProductActionEnum {
  // submit validation
  SetSubmitValidation = "SetSubmitValidation",
  //   item form
  SetItem = "SetItem",
  SetName = "SetName",
  SetCategory = "SetCategory",
  SetProductCategoryList = "SetProductCategoryList",
  SetLength = "SetLength",
  SetWidth = "SetWidth",
  SetHeight = "SetHeight",
  SetWeight = "SetWeight",
  SetDescription = "SetDescription",
  SetAvailability = "SetAvailability",

  //   variant form
  SetVariant = "SetVariant",
  AddVariant = "AddVariant",
  DeleteVariantById = "DeleteVariantById",
  SetVariantSKU = "SetVariantSKU",
  SetVariantName = "SetVariantName",
  SetVariantPrice = "SetVariantPrice",
  SetVariantStock = "SetVariantStock",
  SetVariantAvailability = "SetVariantAvailability",

  //   image form
  SetImages = "SetImages",
  SetErrorImages = "SetErrorImages",
  SetCoverImage = "SetCoverImage",
  SetImageList = "SetImageList",
}

// Action Collection Types
export type AddSupplierProductActions =
  | AddSupplierProductSubmitValidationActions
  | AddSupplierProductItemActions
  | AddSupplierProductVariantActions
  | AddSupplierProductImagesActions;

// Action Collection Types consist of:
// Submit Validation
type AddSupplierProductSubmitValidationPayload = {
  [AddSupplierProductActionEnum.SetSubmitValidation]: {
    name: string;
    category: string;
    length: string;
    width: string;
    height: string;
    weight: string;
    description: string;
    availability: string;
    variants: {
      sku: string;
      name: string;
      stock: string;
      price: string;
    }[];
  };
};

export type AddSupplierProductSubmitValidationActions =
  ActionMap<AddSupplierProductSubmitValidationPayload>[keyof ActionMap<AddSupplierProductSubmitValidationPayload>];

// Item
type AddSupplierProductItemPayload = {
  [AddSupplierProductActionEnum.SetItem]: IAddSupplierProductItem;
  [AddSupplierProductActionEnum.SetName]: string;
  [AddSupplierProductActionEnum.SetCategory]: string;
  [AddSupplierProductActionEnum.SetProductCategoryList]: string[];
  [AddSupplierProductActionEnum.SetLength]: string;
  [AddSupplierProductActionEnum.SetWidth]: string;
  [AddSupplierProductActionEnum.SetHeight]: string;
  [AddSupplierProductActionEnum.SetWeight]: string;
  [AddSupplierProductActionEnum.SetDescription]: string;
  [AddSupplierProductActionEnum.SetAvailability]: string;
};

export type AddSupplierProductItemActions =
  ActionMap<AddSupplierProductItemPayload>[keyof ActionMap<AddSupplierProductItemPayload>];

// Variant
type AddSupplierProductVariantPayload = {
  [AddSupplierProductActionEnum.SetVariant]: IAddSupplierProductVariant[];
  [AddSupplierProductActionEnum.AddVariant]: undefined;
  [AddSupplierProductActionEnum.DeleteVariantById]: string;
  [AddSupplierProductActionEnum.SetVariantSKU]: { id: string; value: string };
  [AddSupplierProductActionEnum.SetVariantName]: { id: string; value: string };
  [AddSupplierProductActionEnum.SetVariantPrice]: { id: string; value: string };
  [AddSupplierProductActionEnum.SetVariantStock]: { id: string; value: string };
  [AddSupplierProductActionEnum.SetVariantAvailability]: string;
};

export type AddSupplierProductVariantActions =
  ActionMap<AddSupplierProductVariantPayload>[keyof ActionMap<AddSupplierProductVariantPayload>];

// Images
type AddSupplierProductImagesPayload = {
  [AddSupplierProductActionEnum.SetImages]: IAddSupplierProductImages;
  [AddSupplierProductActionEnum.SetErrorImages]: {
    status: boolean;
    message: string;
  };
  [AddSupplierProductActionEnum.SetCoverImage]: number;
  [AddSupplierProductActionEnum.SetImageList]: {
    base64: string;
    file_format: string;
  }[];
};

export type AddSupplierProductImagesActions =
  ActionMap<AddSupplierProductImagesPayload>[keyof ActionMap<AddSupplierProductImagesPayload>];
