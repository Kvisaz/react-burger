import React from 'react';
import styles from './order-feed-details-part.module.css';
import { IBurgerPartCounted, IBurgerPartCountedPropType } from '../../../../services/model/IBurgerPart';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export interface IOrderFeedDetailsPartProps extends IBurgerPartCounted {
}

OrderFeedDetailsPart.propTypes = {
  ...IBurgerPartCountedPropType,
};

export function OrderFeedDetailsPart(props: IOrderFeedDetailsPartProps) {
  return (
    <div className={styles.main}>
      <div>{props.image_mobile}</div>
      <div>{props.name}</div>
      <div>{props.amount} x {props.price}</div>
      <CurrencyIcon type={'primary'} />
    </div>
  );
}