import { useEffect } from 'react';
import { ORDERS_ACTION } from '../actions';
import { useMainState } from './useMainState';
import { useAppDispatch } from './useAppDispatch';

export function useOrderFeed() {
  const {
    isAuthorized,
  } = useMainState();
  const dispatch = useAppDispatch();

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