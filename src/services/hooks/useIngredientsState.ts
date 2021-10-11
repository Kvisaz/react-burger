import { IngredientsState } from '../reducers';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useIngredientsState(): IngredientsState {
  return useSelector((state: RootState) => ({ ...state.ingredients }));
}