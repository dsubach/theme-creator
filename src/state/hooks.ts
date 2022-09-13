import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './createStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
