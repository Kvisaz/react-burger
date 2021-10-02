import React from 'react';
import styles from './order-feed-item-part.module.css';
import { Assets } from '../../../Assets';
import PropTypes from 'prop-types';

export interface IOrderFeedItemProps {
  imageUrl: string;
  zIndex: number;
  text?: string;
}

OrderFeedItemPart.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export function OrderFeedItemPart({ imageUrl, zIndex, text }: IOrderFeedItemProps) {
  return (
    <div className={styles.circle} style={{
      zIndex,
      backgroundImage: `url(${Assets.images.partAvatar})`,
    }}>
      <img className={styles.img} src={imageUrl} />
      {text && (<div className={`text text_type_main-default ${styles.text}`}>{text}</div>)}
    </div>
  );
}