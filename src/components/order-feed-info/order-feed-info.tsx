import React, { useMemo } from 'react';
import styles from './order-feed-info.module.css';
import { useMainState } from '../../services/hooks/useMainState';
import { countOrderStatus } from '../../services/converters/countOrderStatus';
import { formatOrderNumber } from '../../services/converters/formatOrderNumber';

const classNames = {
  columnTitle: 'text text_type_main-medium mb-6',
  done: 'text text_type_digits-default ' + styles.success,
  processing: 'text text_type_digits-default ',
  totalTitle: 'text text_type_main-medium ',
  totalAmount: 'text text_type_digits-large ',
};

export function OrderFeedInfo() {

  const { orderFeed, orderTotal, orderToday } = useMainState();

  const orderStatusMap = useMemo(() => countOrderStatus(orderFeed), [orderFeed]);
  const done = useMemo(() => orderStatusMap.done.slice(0, 6), [orderStatusMap.done]);
  const processing = useMemo(
    () => [...orderStatusMap.created, ...orderStatusMap.pending].slice(0, 6),
    [orderStatusMap.created, orderStatusMap.pending],
  );

  return (
    <div className={styles.main}>
      <div className={styles.columns}>
        <div>
          <div className={classNames.columnTitle}>Готовы:</div>
          <div className={classNames.done}>
            {
              done.map(order => (<div>{formatOrderNumber(order.number)}</div>))
            }
          </div>
        </div>
        <div>
          <div className={classNames.columnTitle}>В работе:</div>
          <div className={classNames.processing}>
            {
              processing.map(order => (<div>{formatOrderNumber(order.number)}</div>))
            }
          </div>
        </div>
      </div>
      <div>
        <div className={classNames.totalTitle}>Выполнено за все время:</div>
        <div className={classNames.totalAmount}>{orderTotal}</div>
      </div>
      <div>
        <div className={classNames.totalTitle}>Выполнено за сегодня::</div>
        <div className={classNames.totalAmount}>{orderToday}</div>
      </div>

    </div>
  );
}