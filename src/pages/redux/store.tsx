import { configureStore } from '@reduxjs/toolkit'
import {
    useDispatch as useDispatchBase,
    useSelector as useSelectorBase,
  } from 'react-redux';
import clientReducer from './clientSlice'
import productReducer from './productSlice'

export const store = configureStore({ 
    reducer: {
        client : clientReducer,
        product: productReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);