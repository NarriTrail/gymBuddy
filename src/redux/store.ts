import { configureStore } from '@reduxjs/toolkit'
import insightSlice from './reducers/insightSlice'
export const store = configureStore({
  reducer: {
    insightSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch