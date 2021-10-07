import React, { useMemo } from 'react';
import { IBurgerPart, IBurgerPartPropType } from '../../../../services/model/IBurgerPart';
import PropTypes from 'prop-types';
import { countBurgerParts } from '../../../../services/converters/countBurgerParts';

interface IProps {
  ingredients: IBurgerPart[];
}

OrderFeedDetailsPartList.propTypes = {
  ingredients: PropTypes.arrayOf(IBurgerPartPropType),
};


export function OrderFeedDetailsPartList({ ingredients }: IProps) {

  const counted = useMemo(() => countBurgerParts(ingredients), [ingredients]);

  return (
    <div>
      {counted.map(part => (
        <div key={part._id}>
          <div>{part.name}</div>
          <div>{part.amount} x {part.price}</div>
        </div>
      ))}
    </div>
  );
}