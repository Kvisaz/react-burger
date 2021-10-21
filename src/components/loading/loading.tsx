import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './loading.module.css';

export interface IProps {
  text?: string;
  alert?: boolean;
}

Loading.propTypes = {
  text: PropTypes.string,
  alert: PropTypes.bool,
};

export function Loading({ text = 'Loading...', alert }: IProps) {
  const textClassName = useMemo(() => alert ? styles.alert : '', [
    alert,
  ]);
  return (
    <div className={styles.wrap}>
      <div className={`text text_color_inactive text_type_main-medium ${styles.content} ${textClassName}`}>{text}</div>
    </div>
  );
}