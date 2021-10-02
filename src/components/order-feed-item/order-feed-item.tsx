import React, { useMemo } from 'react';
import styles from './order-feed-item.module.css';
import { IOrderData } from '../../model/IOrderData';
import { formatDate } from './utils/formatDate';
import { OrderFeedItemStatus } from '../order-feed-item-status/order-feed-item-status';
import { OrderFeedItemParts } from '../order-feed-item-parts/order-feed-item-parts';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { IAppState } from '../../model/IAppState';
import { IBurgerPart } from '../../model/IBurgerPart';

interface IOrderFeedItemProps extends IOrderData {
}

export function OrderFeedItem({ name, _id, number, ingredients, status, createdAt }: IOrderFeedItemProps) {
  const dateText = useMemo(() => formatDate(createdAt), [createdAt]);
  const rootState = useSelector<RootState>(store => ({ ...store })) as IAppState;
  const burgerParts: IBurgerPart[] = useMemo(() => getBurgerParts(ingredients, rootState.ingredients),
    [rootState, ingredients]);
  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className='text text_type_digits-default'>#{number}</div>
        <div className='text text_type_main-default text_color_inactive'>{dateText}</div>
      </div>
      <div className={styles.rowName}>
        <div className='text text_type_main-medium'>{name}</div>
        <OrderFeedItemStatus status={status} />
      </div>
      <OrderFeedItemParts ingredients={burgerParts} />
    </div>
  );
}

function getBurgerPart(id: string, parts: IBurgerPart[]): IBurgerPart | undefined {
  return parts.filter(p => p._id === id)[0];
}

function getBurgerParts(ids: string[], parts: IBurgerPart[]): IBurgerPart[] {
  return removeDuplicates(
    sortParts(
      mapBurgerParts(ids, parts),
    ),
  );
}

function mapBurgerParts(ids: string[], parts: IBurgerPart[]): IBurgerPart[] {
  return ids.reduce<IBurgerPart[]>((acc, id) => {
    const nextPart = getBurgerPart(id, parts);
    if (nextPart) acc.push(nextPart);
    return acc;
  }, []);
}

function sortParts(parts: IBurgerPart[]): IBurgerPart[] {
  return parts.sort((a, b) => a.type === 'bun' ? -1 : 1);
}

function removeDuplicates(parts: IBurgerPart[]): IBurgerPart[] {
  return Array.from(new Set(parts));
}