import { thousandSeparator } from "@/src/core/utils/formatters";
import {
  invalidDetailAddressValidation,
  invalidEmailValidation,
  invalidNameValidation,
  invalidPhonenumberValidation,
} from "@/src/core/utils/validation";
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
        filled: {
          ...state.filled,
          status: false,
        },
        name: {
          ...state.name,
          change_value: "",
          save_value: "",
          error: true,
        },
        email: {
          change_value: "",
          save_value: "",
          error: true,
        },
        mobile: {
          change_value: "",
          save_value: "",
          error: true,
        },
        address: {
          change_value: "",
          save_value: "",
          selected_index: "-1",
          selected_value: "",
          list: [],
          error: true,
        },
        detail_address: {
          change_value: "",
          save_value: "",
          error: true,
        },
        disabled_save_change: {
          status: true,
        },
      };
    case SingleShipmentActionEnum.SetNameValue:
      return {
        ...state,
        name: {
          ...state.name,
          change_value: action.payload,
          error: invalidNameValidation(action.payload),
        },
        disabled_save_change: {
          ...state.disabled_save_change,
          status:
            invalidNameValidation(action.payload) ||
            state.email.error ||
            state.mobile.error ||
            state.address.error ||
            state.detail_address.error,
        },
      };

    case SingleShipmentActionEnum.SetEmailValue:
      return {
        ...state,
        email: {
          ...state.email,
          change_value: action.payload,
          error: invalidEmailValidation(action.payload),
        },
        disabled_save_change: {
          ...state.disabled_save_change,
          status:
            state.name.error ||
            invalidEmailValidation(action.payload) ||
            state.mobile.error ||
            state.address.error ||
            state.detail_address.error,
        },
      };

    case SingleShipmentActionEnum.SetMobileValue:
      return {
        ...state,
        mobile: {
          ...state.mobile,
          change_value: action.payload,
          error: invalidPhonenumberValidation(action.payload),
        },
        disabled_save_change: {
          ...state.disabled_save_change,
          status:
            state.name.error ||
            state.email.error ||
            invalidPhonenumberValidation(action.payload) ||
            state.address.error ||
            state.detail_address.error,
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
    case SingleShipmentActionEnum.ClearAddressValue:
      return {
        ...state,
        address: {
          ...state.address,
          change_value: "",
          selected_index: "-1",
          selected_value: "",
          save_value: "",
          error: true,
        },
        disabled_save_change: {
          ...state.disabled_save_change,
          status:
            state.name.error ||
            state.email.error ||
            state.mobile.error ||
            true ||
            state.detail_address.error,
        },
      };

    case SingleShipmentActionEnum.SelectAddressValue:
      return {
        ...state,
        address: {
          ...state.address,
          selected_index: action.payload,
          selected_value: state.address.list.filter(
            (_, index) => String(index) === action.payload
          )[0],
          error: false,
        },
        disabled_save_change: {
          ...state.disabled_save_change,
          status:
            state.name.error ||
            state.email.error ||
            state.mobile.error ||
            false ||
            state.detail_address.error,
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
          error: invalidDetailAddressValidation(action.payload),
        },
        disabled_save_change: {
          ...state.disabled_save_change,
          status:
            state.name.error ||
            state.email.error ||
            state.mobile.error ||
            state.address.error ||
            invalidDetailAddressValidation(action.payload),
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
          save_value: state.address.selected_value,
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
    case SingleShipmentActionEnum.SwitchDropshipperOption:
      return {
        ...state,
        is_dropshipper: !state.is_dropshipper,
      };
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
    case SingleShipmentActionEnum.SetShippingValue:
      return {
        ...state,
        summary: {
          ...state.summary,
          shipment_cost: thousandSeparator(
            state.detail.reduce((acc, item, index) => {
              const totalShipmentCost = item.shipping_options.list
                .map((optionItem, optionsIndex) => {
                  return {
                    ...optionItem,
                    selected:
                      action.payload.index === index &&
                      parseInt(action.payload.id) === optionsIndex
                        ? !optionItem.selected
                        : action.payload.index === index &&
                          parseInt(action.payload.id) !== optionsIndex
                        ? false
                        : optionItem.selected,
                  };
                })
                .filter((shippingItem) => shippingItem.selected)
                .reduce((shippingAcc, shippingItem) => {
                  return shippingItem.price + shippingAcc;
                }, 0);
              return acc + totalShipmentCost;
            }, 0)
          ),
          order_confirmation: {
            ...state.summary.order_confirmation,

            disabled: !(
              state.detail.reduce((acc, item, index) => {
                const total = item.shipping_options.list
                  .map((optionItem, optionsIndex) => {
                    return {
                      ...optionItem,
                      selected:
                        action.payload.index === index &&
                        parseInt(action.payload.id) === optionsIndex
                          ? !optionItem.selected
                          : action.payload.index === index &&
                            parseInt(action.payload.id) !== optionsIndex
                          ? false
                          : optionItem.selected,
                    };
                  })
                  .filter((optionItem) => optionItem.selected).length;
                return total;
              }, 0) === state.detail.length
            ),
            // disabled: false,
          },
        },
        detail: state.detail.map((item, itemIndex) => {
          return {
            ...item,
            shipping_options: {
              ...item.shipping_options,
              list: item.shipping_options.list.map(
                (shippingList, shippingListIndex) => {
                  return {
                    ...shippingList,
                    selected:
                      action.payload.index === itemIndex &&
                      parseInt(action.payload.id) === shippingListIndex
                        ? !shippingList.selected
                        : action.payload.index === itemIndex &&
                          parseInt(action.payload.id) !== shippingListIndex
                        ? false
                        : shippingList.selected,
                  };
                }
              ),
            },
          };
        }),
      };
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
          order_confirmation: {
            ...state.summary.order_confirmation,
            show: false,
          },
          continue_payment: {
            ...state.summary.continue_payment,
            show: true,
          },
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
