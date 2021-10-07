import React, { useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styles from './order-feed-item.module.css';
import { OrderFeedItemStatus } from '../order-feed-item-status/order-feed-item-status';
import { OrderFeedItemParts } from '../order-feed-item-parts/order-feed-item-parts';
import { IBurgerPart, IBurgerPartPropType } from '../../services/model/IBurgerPart';
import { IOrderFeedItem } from '../../services/model/IOrderFeedItem';
import PropTypes from 'prop-types';
import { OrderData } from '../order-data/order-data';
import { formatOrderNumber } from '../../services/converters/formatOrderNumber';

export interface IOrderFeedItemProps extends IOrderFeedItem {
  name: string;
  id: string;
  number: number;
  ingredients: IBurgerPart[];
  status: string;
  createdAt: string;
  withStatus?: boolean;
}

OrderFeedItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(IBurgerPartPropType),
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  withStatus: PropTypes.bool,
};

export function OrderFeedItem({ id, name, withStatus, number, ingredients, status, createdAt }: IOrderFeedItemProps) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const openUrl = useMemo(() => `${url}/${id}`, [url, id]);
  return (
    <div className={styles.main} onClick={() => history.push(openUrl)}>
      <div className={styles.row}>
        <div className='text text_type_digits-default'>#{formatOrderNumber(number)}</div>
        <OrderData data={createdAt} />
      </div>
      <div className={styles.rowName}>
        <div className='text text_type_main-medium'>{name}</div>
        {withStatus && (<OrderFeedItemStatus status={status} />)}
      </div>
      <OrderFeedItemParts ingredients={ingredients} maxLength={5} />
    </div>
  );
}