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
  item: IEditSupplierProductItem;
  variant: IEditSupplierProductVariant[];
  images: IEditSupplierProductImages;
}

// State Collection Types consist of:
export interface IEditSupplierProductItem {
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

export interface IEditSupplierProductVariant {
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

export interface IEditSupplierProductImages {
  cover_image_position: number;
  list: {
    // position: number;
    // file_format: string;
    // file: string;
    base64: string;
    file_format: string;
  }[];
}

export enum EditSupplierProductActionEnum {
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
  SetCoverImage = "SetCoverImage",
  SetImageList = "SetImageList",
}

// Action Collection Types
export type EditSupplierProductActions =
  | EditSupplierProductItemActions
  | EditSupplierProductVariantActions
  | EditSupplierProductImagesActions;

// Action Collection Types consist of:
// Item
type EditSupplierProductItemPayload = {
  [EditSupplierProductActionEnum.SetItem]: IEditSupplierProductItem;
  [EditSupplierProductActionEnum.SetName]: string;
  [EditSupplierProductActionEnum.SetCategory]: string;
  [EditSupplierProductActionEnum.SetProductCategoryList]: string[];
  [EditSupplierProductActionEnum.SetLength]: string;
  [EditSupplierProductActionEnum.SetWidth]: string;
  [EditSupplierProductActionEnum.SetHeight]: string;
  [EditSupplierProductActionEnum.SetWeight]: string;
  [EditSupplierProductActionEnum.SetDescription]: string;
  [EditSupplierProductActionEnum.SetAvailability]: string;
};

export type EditSupplierProductItemActions =
  ActionMap<EditSupplierProductItemPayload>[keyof ActionMap<EditSupplierProductItemPayload>];

// Variant
type EditSupplierProductVariantPayload = {
  [EditSupplierProductActionEnum.SetVariant]: IEditSupplierProductVariant[];
  [EditSupplierProductActionEnum.AddVariant]: undefined;
  [EditSupplierProductActionEnum.DeleteVariantById]: string;
  [EditSupplierProductActionEnum.SetVariantSKU]: { id: string; value: string };
  [EditSupplierProductActionEnum.SetVariantName]: { id: string; value: string };
  [EditSupplierProductActionEnum.SetVariantPrice]: {
    id: string;
    value: string;
  };
  [EditSupplierProductActionEnum.SetVariantStock]: {
    id: string;
    value: string;
  };
  [EditSupplierProductActionEnum.SetVariantAvailability]: string;
};

export type EditSupplierProductVariantActions =
  ActionMap<EditSupplierProductVariantPayload>[keyof ActionMap<EditSupplierProductVariantPayload>];

// Images
type EditSupplierProductImagesPayload = {
  [EditSupplierProductActionEnum.SetImages]: IEditSupplierProductImages;
  [EditSupplierProductActionEnum.SetCoverImage]: number;
  [EditSupplierProductActionEnum.SetImageList]: {
    base64: string;
    file_format: string;
  }[];
};

export type EditSupplierProductImagesActions =
  ActionMap<EditSupplierProductImagesPayload>[keyof ActionMap<EditSupplierProductImagesPayload>];
