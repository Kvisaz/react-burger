import React, { useMemo } from 'react';
import { getStatusClassname, getStatusText } from './utils/createStatusText';

interface IOrderFeedItemStatus {
  status: string;
}

export function OrderFeedItemStatus({ status }: IOrderFeedItemStatus) {
  const statusText = useMemo(() => getStatusText(status), [status]);
  const statusClassName = useMemo(() => getStatusClassname(status), [status]);
  return (
    <div className={statusClassName}>{statusText}</div>
  );
}


