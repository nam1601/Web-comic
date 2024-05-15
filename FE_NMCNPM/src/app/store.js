import { configureStore } from '@reduxjs/toolkit';
import userReducers from '../features/user/userSlice';
import followReducers from '~/features/follow/followSlice';
import commentReducers from '~/features/comment/commentSlice';
export const store = configureStore({
    reducer: { userReducers, followReducers, commentReducers },
});
