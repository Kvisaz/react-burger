import { IConstructorElementData } from './IConstructorElementData';

export interface IOrderData {
  id: number;
  burgerName: string;
  sum: number;
  selectedBun: IConstructorElementData;
  selectedParts: IConstructorElementData[];
  date: string;
  status: OrderStatus;
}

export enum OrderStatus {
  NOT_ORDERED = 'NOT_ORDERED', // начальный этап сборки
  ORDERED = 'ORDERED',        // заказан, Api подтвердило заказ
  PROCESSING = 'PROCESSING',  // Api сообщило о взятиии в работу
  READY = 'READY',            // Api сообщило о готовности
}