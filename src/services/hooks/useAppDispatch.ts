import { useDispatch } from 'react-redux';
import { AppDispatch, AppThunk } from '../store';

export const useAppDispatch = ()  => useDispatch<AppDispatch | AppThunk>();
