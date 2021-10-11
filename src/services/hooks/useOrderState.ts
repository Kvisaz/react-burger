import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IOrderState } from '../reducers/orders';

export function useOrderState(): IOrderState {
  return useSelector((state: RootState) => ({ ...state.orders }));
}