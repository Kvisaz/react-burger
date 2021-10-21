import { RootState } from '../store';
import { IOrderState } from '../reducers/orders';
import { useAppSelector } from './useAppSelector';

export function useOrderState(): IOrderState {
  return useAppSelector((state: RootState) => ({ ...state.orders }));
}