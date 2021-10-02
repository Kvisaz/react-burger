import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './order-feed-item-parts.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../model/IBurgerPart';
import { Assets } from '../../Assets';
import { IOrderFeedItemProps, OrderFeedItemPart } from '../common/order-feed-item-part/order-feed-item-part';

interface IProps {
  ingredients: IBurgerPart[];
}

OrderFeedItemParts.propTypes = {
  ingredients: PropTypes.arrayOf(IBurgerPartPropType),
};

const MAX_LENGTH = 2;

export function OrderFeedItemParts({ ingredients }: IProps) {

  const itemProps: IOrderFeedItemProps [] = useMemo(() => {
    const LENGTH = ingredients.length;
    const overFlow = LENGTH - MAX_LENGTH;
    const isOverFlow = overFlow > 0;

    let nextZindex = MAX_LENGTH + 1;

    const props: IOrderFeedItemProps[] = [
      ...ingredients
        .slice(0, MAX_LENGTH)
        .map((part, index) => (
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
  }, [ingredients]);

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