import { IViralProducts, ResellerHomeActionEnum } from "./Home.types";
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

// ViralProducts

type ViralProductsPayload = {
  [ResellerHomeActionEnum.SetViralProducts]: IViralProducts[];
};

export type ViralProductsActions =
  ActionMap<ViralProductsPayload>[keyof ActionMap<ViralProductsPayload>];

export const viralProductsReducer = (
  state: IViralProducts[],
  action: ViralProductsActions
) => {
  switch (action.type) {
    case ResellerHomeActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
