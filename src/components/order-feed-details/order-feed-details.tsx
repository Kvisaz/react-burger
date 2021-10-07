import React from 'react';
import styles from './order-feed-details.module.css';
import PropTypes from 'prop-types';

export interface IOrderFeedDetailsProps {
  withStatus?: boolean;
}

OrderFeedDetails.propTypes = {
  withStatus: PropTypes.bool,
};


export function OrderFeedDetails({ withStatus }: IOrderFeedDetailsProps) {
  return (<div className={styles.main}>
    <div className={styles.content}>
      <div>#034533</div>
      <div>
        <div>Black Hole Singularity острый бургер</div>
        {withStatus && (<div> Выполнен </div>)}
      </div>

      <div>Состав:</div>
      <div>
        <div>Флюоресцентная булка R2-D3</div>
        <div>Флюоресцентная булка R2-D3</div>
        <div>Флюоресцентная булка R2-D3</div>
        <div>Флюоресцентная булка R2-D3</div>
      </div>

      <div>
        <div>Вчера, 13:50 i-GMT+3</div>
        <div>510</div>
      </div>
    </div>
  </div>);
}