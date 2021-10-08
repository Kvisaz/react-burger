import { IAppState } from '../model/IAppState';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useMainState(): IAppState {
  return useSelector((state: RootState) => ({ ...state }));
}