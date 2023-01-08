import React, { createContext, useReducer, Dispatch } from "react";
import {
  MultipleShipmentActions,
  InitialStateType,
} from "./MultipleShipment.types";
import {
  multipleShipmentDropshipperReducer,
  multipleShipmentPersonalInformationReducer,
} from "./MultipleShipment.reducers";

const initialState: InitialStateType = {
  personal_information: {
    name: {
      value: "",
    },
    email: {
      value: "",
    },
    mobile: {
      value: "",
    },
    address: {
      value: "",
    },
    detail_address: {
      value: "",
    },
  },
  dropshipper: {
    name: {
      value: "",
    },
    mobile: {
      value: "",
    },
  },
};

const MultipleShipmentContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<MultipleShipmentActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { personal_information, dropshipper }: InitialStateType,
  action: MultipleShipmentActions
) => ({
  personal_information: multipleShipmentPersonalInformationReducer(
    personal_information,
    action
  ),
  dropshipper: multipleShipmentDropshipperReducer(dropshipper, action),
});

const MultipleShipmentProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MultipleShipmentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MultipleShipmentContext.Provider>
  );
};

export { MultipleShipmentProvider, MultipleShipmentContext };
