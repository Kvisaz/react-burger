import React from 'react';
import styles from './order-feed-info.module.css';

const classNames = {
  columnTitle: 'text text_type_main-medium mb-6',
  done: 'text text_type_digits-default ' + styles.success,
  processing: 'text text_type_digits-default ',
  totalTitle: 'text text_type_main-medium ',
  totalAmount: 'text text_type_digits-large ',
};

export function OrderFeedInfo() {
  return (
    <div className={styles.main}>
      <div className={styles.columns}>
        <div>
          <div className={classNames.columnTitle}>Готовы:</div>
          <div className={classNames.done}>
            <div>034533</div>
            <div>034533</div>
            <div>034533</div>
            <div>034533</div>
            <div>034533</div>
          </div>
        </div>
        <div>
          <div className={classNames.columnTitle}>В работе:</div>
          <div className={classNames.processing}>
            <div>034538</div>
            <div>034538</div>
            <div>034538</div>
            <div>034538</div>
            <div>034538</div>
          </div>
        </div>
      </div>
      <div>
        <div className={classNames.totalTitle}>Выполнено за все время:</div>
        <div className={classNames.totalAmount}>28 752</div>
      </div>
      <div>
        <div className={classNames.totalTitle}>Выполнено за сегодня::</div>
        <div className={classNames.totalAmount}>138</div>
      </div>

    </div>
  );
}