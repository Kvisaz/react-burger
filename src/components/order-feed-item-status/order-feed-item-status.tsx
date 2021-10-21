import React, { useMemo } from 'react';
import { getStatusClassname, getStatusText } from './utils/createStatusText';
import PropTypes from 'prop-types';

interface IOrderFeedItemStatus {
  status: string;
}

OrderFeedItemStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export function OrderFeedItemStatus({ status }: IOrderFeedItemStatus) {
  const statusText = useMemo(() => getStatusText(status), [status]);
  const statusClassName = useMemo(() => getStatusClassname(status), [status]);
  return (
    <div className={statusClassName}>{statusText}</div>
  );
}


