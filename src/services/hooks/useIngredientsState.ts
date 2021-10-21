import { IngredientsState } from '../reducers';
import { RootState } from '../store';
import { useAppSelector } from './useAppSelector';

export function useIngredientsState(): IngredientsState {
  return useAppSelector((state: RootState) => ({ ...state.ingredients }));
}