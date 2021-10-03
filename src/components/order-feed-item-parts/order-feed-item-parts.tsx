import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './order-feed-item-parts.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../services/model/IBurgerPart';
import { Assets } from '../../Assets';
import { IOrderFeedItemProps, OrderFeedItemPart } from '../common/order-feed-item-part/order-feed-item-part';

interface IProps {
  ingredients: IBurgerPart[];
  maxLength: number;
}

OrderFeedItemParts.propTypes = {
  ingredients: PropTypes.arrayOf(IBurgerPartPropType),
  maxLength: PropTypes.number.isRequired
};

export function OrderFeedItemParts({ ingredients, maxLength }: IProps) {

  const itemProps: IOrderFeedItemProps [] = useMemo(() => {
    const LENGTH = ingredients.length;
    const overFlow = LENGTH - maxLength;
    const isOverFlow = overFlow > 0;

    let nextZindex = maxLength + 1;

    const props: IOrderFeedItemProps[] = [
      ...ingredients
        .slice(0, maxLength)
        .map((part) => (
          {
            imageUrl: part.image_mobile,
            zIndex: nextZindex--,
          }
        )),
    ];
    if (isOverFlow) props.push({
      imageUrl: Assets.images.partsMore,
      text: `+${overFlow}`,
      zIndex:  nextZindex--,
    });
    return props;
  }, [ingredients, maxLength]);

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        {
          itemProps
            .map((props, index) => (
              <OrderFeedItemPart key={index} {...props} />
            ))
        }
      </div>
    </div>
  );
}