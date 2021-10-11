import { IMainState } from '../reducers';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useMainState(): IMainState {
  return useSelector((state: RootState) => ({ ...state.main }));
}