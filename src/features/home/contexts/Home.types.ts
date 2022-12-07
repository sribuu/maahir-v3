export interface IViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export interface InitialStateType {
  viral_products: IViralProducts[];
}

export enum ResellerHomeActionEnum {
  SetViralProducts = "SetViralProducts",
}
