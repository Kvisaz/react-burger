import { IMainState } from '../reducers';
import { RootState } from '../store';
import { useAppSelector } from './useAppSelector';

export function useMainState(): IMainState {
  return useAppSelector((state: RootState) => ({ ...state.main }));
}