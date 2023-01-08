import {
  IMultipleShipmentDropshipper,
  IMultipleShipmentPersonalInformation,
  MultipleShipmentActionEnum,
  MultipleShipmentActions,
} from "./MultipleShipment.types";

// Personal Information
export const multipleShipmentPersonalInformationReducer = (
  state: IMultipleShipmentPersonalInformation,
  action: MultipleShipmentActions
) => {
  switch (action.type) {
    case MultipleShipmentActionEnum.SetPersonalInformation:
      return action.payload;
    case MultipleShipmentActionEnum.SetNameValue:
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
        },
      };
    case MultipleShipmentActionEnum.SetEmailValue:
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload,
        },
      };
    case MultipleShipmentActionEnum.SetMobileValue:
      return {
        ...state,
        mobile: {
          ...state.mobile,
          value: action.payload,
        },
      };
    case MultipleShipmentActionEnum.SetAddressValue:
      return {
        ...state,
        address: {
          ...state.address,
          value: action.payload,
        },
      };
    case MultipleShipmentActionEnum.SetDetailAddressValue:
      return {
        ...state,
        detail_address: {
          ...state.detail_address,
          value: action.payload,
        },
      };
    default:
      return state;
  }
};

// Dropshipper
export const multipleShipmentDropshipperReducer = (
  state: IMultipleShipmentDropshipper,
  action: MultipleShipmentActions
) => {
  switch (action.type) {
    case MultipleShipmentActionEnum.SetDropshipper:
      return action.payload;
    case MultipleShipmentActionEnum.SetDropshipperNameValue:
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
        },
      };
    case MultipleShipmentActionEnum.SetDropshipperMobileValue:
      return {
        ...state,
        mobile: {
          ...state.mobile,
          value: action.payload,
        },
      };
    default:
      return state;
  }
};
