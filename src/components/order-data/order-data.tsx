import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../services/converters/formatDate';

interface IProps {
  data: string;
}

OrderData.propTypes = {
  data: PropTypes.string.isRequired,
};

export function OrderData({ data }: IProps) {
  const dateText = useMemo(() => formatDate(data), [data]);

  return (
    <div className='text text_type_main-default text_color_inactive'>{dateText}</div>
  );
}