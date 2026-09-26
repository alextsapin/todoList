import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';

import { AppDispatch, AppStateType } from './store';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
