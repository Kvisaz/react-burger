import { IOrderFeedItem } from '../../model/IOrderFeedItem';
import { IConstructorElementData } from '../../model/IConstructorElementData';
import { IBurgerPart } from '../../model/IBurgerPart';

export interface IOrderState {
  ingredientAmountMap: Record<string, number>;
  sum: number;
  selectedBun?: IConstructorElementData;
  selectedParts: IConstructorElementData[];

  selectedIngredient?: IBurgerPart;

  // общая лента заказов
  orderFeed: IOrderFeedItem[];
  orderTotal: number;
  orderToday: number;

  isOrderRequest: boolean;
  isOrderSuccess: boolean;
  isOrderFailed: boolean;


  showCreatedOrder?: IOrderFeedItem;
  showedOrders: IOrderFeedItem[];
}

export const InitialOrdersFeedState: IOrderState = {
  sum: 0,
  ingredientAmountMap: {},
  selectedBun: undefined,
  selectedParts: [],
  orderFeed: [],
  orderTotal: 0,
  orderToday: 0,
  isOrderRequest: false,
  isOrderFailed: false,
  isOrderSuccess: false,
  showedOrders: [],
};