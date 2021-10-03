import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './order-feed.module.css';
import { updateOrderFeed } from '../../services/actions';
import { RootState } from '../../services/store';
import { IOrderFeedItemProps, OrderFeedItem } from '../order-feed-item/order-feed-item';
import { IOrderData } from '../../services/model/IOrderData';
import { IBurgerPart } from '../../services/model/IBurgerPart';
import { getBurgerParts } from '../../services/converters/getBurgerParts';

export function OrderFeed() {
  const dispatch = useDispatch();

  const { orderFeed, ingredients } = useSelector((state: RootState) => ({ ...state }));
  const hasOrders = useMemo(() => orderFeed.length > 0, [orderFeed]);

  const orderProps: IOrderFeedItemProps[] = useMemo(
    () => orderFeed.map(data => mapOrderItemProps(data, ingredients)),
    [orderFeed, ingredients]);

  useEffect(() => {
    dispatch(updateOrderFeed());
  }, [dispatch]);

  return (
    <>
      {hasOrders ? (
        <div className={styles.list}>
          {orderProps.map(order => (
            <OrderFeedItem key={order.id} {...order} />
          ))}
        </div>
      ) : (
        <div className='text text_type_main-small text_color_inactive'>Вы пока ничего не заказали</div>
      )}
    </>
  );
}

function mapOrderItemProps(data: IOrderData, ingredients: IBurgerPart[]): IOrderFeedItemProps {
  return {
    createdAt: data.createdAt,
    id: data._id,
    name: data.name,
    number: data.number,
    status: data.status,
    ingredients: getBurgerParts(data.ingredients, ingredients),
  };
}