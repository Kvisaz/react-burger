import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { IBurgerPart, IBurgerPartPropType } from '../../../../services/model/IBurgerPart';
import { countBurgerParts } from '../../../../services/converters/countBurgerParts';
import styles from './order-feed-details-part-list.module.css'

interface IProps {
  ingredients: IBurgerPart[];
}

OrderFeedDetailsPartList.propTypes = {
  ingredients: PropTypes.arrayOf(IBurgerPartPropType),
};


export function OrderFeedDetailsPartList({ ingredients }: IProps) {

  const counted = useMemo(() => countBurgerParts(ingredients), [ingredients]);

  return (
    <div className={styles.main}>
      {counted.map(part => (
        <div key={part._id}>
          <div>{part.name}</div>
          <div>{part.amount} x {part.price}</div>
        </div>
      ))}
    </div>
  );
}