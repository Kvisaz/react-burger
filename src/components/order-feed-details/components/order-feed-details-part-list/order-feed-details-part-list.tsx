import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { IBurgerPart, IBurgerPartPropType } from '../../../../services/model/IBurgerPart';
import { countBurgerParts } from '../../../../services/converters/countBurgerParts';
import styles from './order-feed-details-part-list.module.css';
import { OrderFeedItemPart } from '../../../common/order-feed-item-part/order-feed-item-part';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
  ingredients: IBurgerPart[];
}

OrderFeedDetailsPartList.propTypes = {
  ingredients: PropTypes.arrayOf(IBurgerPartPropType),
};


export function OrderFeedDetailsPartList({ ingredients }: IProps) {

  const counted = useMemo(() => countBurgerParts(ingredients), [ingredients]);

  const listClassName = useMemo(() => ingredients.length <= 3 ?
    styles.main : `${styles.main} ${styles.scrollable}`,
    [ingredients.length]);

  return (
    <div className={listClassName}>
      {counted.map(part => (
        <div key={part._id} className={styles.row}>
          <div className={styles.rowPart}>
            <OrderFeedItemPart imageUrl={part.image_mobile} zIndex={1} />
            <div className='ml-4 text text_type_main-default'>{part.name}</div>
          </div>
          <div className={styles.rowPart}>
            <div className='text text_type_digits-default mr-2'>{part.amount} x {part.price}</div>
            <CurrencyIcon type={'primary'} />
          </div>
        </div>
      ))}
    </div>
  );
}