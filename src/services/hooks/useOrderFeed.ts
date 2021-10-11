import { useEffect } from 'react';
import { ORDERS_ACTION } from '../actions';
import { useMainState } from './useMainState';
import { useDispatch } from 'react-redux';

export function useOrderFeed() {
  const {
    isAuthorized,
  } = useMainState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(ORDERS_ACTION.initOrderFeedSocket());
    } else {
      dispatch(ORDERS_ACTION.updateOrderFeedFromHttp());
    }

    return () => {
      dispatch(ORDERS_ACTION.closeSocket());
    };
  }, [dispatch, isAuthorized]);

}