import { thousandSeparator } from "@/src/core/utils/formatters";
import {
  ISingleShipmentDropshipper,
  ISingleShipmentOrders,
  ISingleShipmentPersonalInformation,
  SingleShipmentActionEnum,
  SingleShipmentActions,
} from "./SingleShipment.types";

// Personal Information
export const singleShipmentPersonalInformationReducer = (
  state: ISingleShipmentPersonalInformation,
  action: SingleShipmentActions
) => {
  switch (action.type) {
    case SingleShipmentActionEnum.SetPersonalInformation:
      return action.payload;
    case SingleShipmentActionEnum.OpenModalPersonalInformation:
      return {
        ...state,
        modal: {
          ...state.modal,
          open: true,
        },
      };
    case SingleShipmentActionEnum.CloseModalPersonalInformation:
      return {
        ...state,
        modal: {
          ...state.modal,
          open: false,
        },
      };
    case SingleShipmentActionEnum.SetNameValue:
      return {
        ...state,
        name: {
          ...state.name,
          change_value: action.payload,
        },
      };
    case SingleShipmentActionEnum.SetEmailValue:
      return {
        ...state,
        email: {
          ...state.email,
          change_value: action.payload,
        },
      };
    case SingleShipmentActionEnum.SetMobileValue:
      return {
        ...state,
        mobile: {
          ...state.mobile,
          change_value: action.payload,
        },
      };
    case SingleShipmentActionEnum.SetAddressValue:
      return {
        ...state,
        address: {
          ...state.address,
          change_value: action.payload,
        },
      };
    case SingleShipmentActionEnum.SetAddressList:
      return {
        ...state,
        address: {
          ...state.address,
          list: action.payload,
        },
      };
    case SingleShipmentActionEnum.SetDetailAddressValue:
      return {
        ...state,
        detail_address: {
          ...state.detail_address,
          change_value: action.payload,
        },
      };
    case SingleShipmentActionEnum.SaveChangeValue:
      return {
        ...state,
        filled: {
          ...state.filled,
          status: true,
        },
        modal: {
          ...state.modal,
          open: false,
        },
        name: {
          ...state.name,
          save_value: state.name.change_value,
        },
        email: {
          ...state.email,
          save_value: state.email.change_value,
        },
        mobile: {
          ...state.mobile,
          save_value: state.mobile.change_value,
        },
        address: {
          ...state.address,
          save_value: state.address.change_value,
        },
        detail_address: {
          ...state.detail_address,
          save_value: state.detail_address.change_value,
        },
      };
    default:
      return state;
  }
};

// Dropshippper
export const singleShipmentDropshipperReducer = (
  state: ISingleShipmentDropshipper,
  action: SingleShipmentActions
) => {
  switch (action.type) {
    case SingleShipmentActionEnum.SetDropshipper:
      return action.payload;
    case SingleShipmentActionEnum.SetDropshipperNameValue:
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
        },
      };
    case SingleShipmentActionEnum.SetDropshipperMobileValue:
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

// Orders
export const singleShipmentOrdersReducer = (
  state: ISingleShipmentOrders,
  action: SingleShipmentActions
) => {
  switch (action.type) {
    case SingleShipmentActionEnum.SetOrders:
      return action.payload;
    case SingleShipmentActionEnum.SetPaymentList:
      return {
        ...state,
        payment: {
          ...state.payment,
          list: action.payload,
        },
      };
    case SingleShipmentActionEnum.OpenModalPayment:
      return {
        ...state,
        payment: {
          ...state.payment,
          modal: {
            ...state.payment.modal,
            open: true,
          },
        },
      };
    case SingleShipmentActionEnum.CloseModalPayment:
      return {
        ...state,
        payment: {
          ...state.payment,
          modal: {
            ...state.payment.modal,
            open: false,
          },
        },
      };

    case SingleShipmentActionEnum.ClickOrderConfirmation:
      return {
        ...state,
        payment: {
          ...state.payment,
          modal: {
            ...state.payment.modal,
            open: true,
          },
        },
      };
    case SingleShipmentActionEnum.SelectPaymentMethod:
      return {
        ...state,
        payment: {
          ...state.payment,
          list: state.payment.list.map((item) => {
            return {
              ...item,
              selected:
                item.selected && item.id === action.payload
                  ? false
                  : item.id === action.payload,
            };
          }),
          cta: {
            ...state.payment.cta,
            payment: {
              ...state.payment.cta.payment,
              disabled:
                state.payment.list.filter(
                  (item) => item.id === action.payload
                )[0].selected &&
                state.payment.list.filter(
                  (item) => item.id === action.payload
                )[0].id === action.payload
                  ? true
                  : false,
            },
          },
        },
      };

    case SingleShipmentActionEnum.ClickPayItems:
      return {
        ...state,
        summary: {
          ...state.summary,
          service_cost: thousandSeparator(
            state.payment.list.filter((item) => item.selected)[0].fee
          ),
        },
        payment: {
          ...state.payment,
          modal: {
            ...state.payment.modal,
            open: false,
          },
        },
      };

    default:
      return state;
  }
};
