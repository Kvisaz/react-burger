import { IOrderFeedItem, OrderStatus } from '../model/IOrderFeedItem';

export interface IOrderStatusMap {
  unknown: IOrderFeedItem[];
  created: IOrderFeedItem[];
  pending: IOrderFeedItem[];
  done: IOrderFeedItem[];
}

export function countOrderStatus(orders: IOrderFeedItem[]): IOrderStatusMap {
  const unknown: IOrderFeedItem[] = [];
  const created: IOrderFeedItem[] = [];
  const pending: IOrderFeedItem[] = [];
  const done: IOrderFeedItem[] = [];

  orders.forEach(order => {
    switch (order.status){
      case OrderStatus.CREATED:
        created.push(order);
        break;
      case OrderStatus.PENDING:
        pending.push(order);
        break;
      case OrderStatus.DONE:
        done.push(order)
        break;
      default:
        unknown.push(order);
    }
  })

  return {
    unknown,
    created,
    pending,
    done,
  };
}

