import { IBurgerPart } from './IBurgerPart';

export interface IApiOrderFeedItem {
  _id: string; // "6152596ca0dd75001c7080c1",
  ingredients: string[]; // [ "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
  status: string,
  name: string; // "Флюоресцентный бургер",
  createdAt: string; //  '2021-09-27T23:53:16.597Z',
  updatedAt: string; // '2021-09-27T23:53:16.753Z',
  number: number; // 4029
}

export interface IOrderFeedItem {
  id: string;
  name: string;
  number: number;
  ingredients: IBurgerPart[];
  status: string;
  createdAt: string;
  withStatus?: boolean;
}

export enum OrderStatus {
  NOT_ORDERED = 'not_ordered', // начальный этап сборки
  ORDERED = 'ordered',        // заказан, Api подтвердило заказ
  PROCESSING = 'processing',  // Api сообщило о взятиии в работу
  DONE = 'done',            // Api сообщило о готовности
}