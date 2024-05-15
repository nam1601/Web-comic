import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
    handleRegister,
    handleLogin,
    changeUserInfo,
    changePassWord,
} from '~/service/BEService/index';
const initialState = localStorage.getItem('user')
    ? {
          data: JSON.parse(localStorage.getItem('user')),
          isLoggedIn: false,
          status: 'idle',
          error: null,
      }
    : {
          data: {},
          isLoggedIn: false,
          status: 'idle',
          error: null,
      };
export const login = createAsyncThunk('user/login', async (credentials) => {
    const response = await handleLogin(credentials.email, credentials.password);
    return response.data;
});
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData) => {
        const response = await handleRegister(
            userData.email,
            userData.password,
        );

        return response.data; // Trả về dữ liệu người dùng đã được đăng ký từ API
    },
);
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (credentials) => {
        const response = await changeUserInfo(
            credentials.userId,
            credentials.data,
        );

        return response.data;
    },
);
export const changePass = createAsyncThunk(
    'user/changePass',
    async (credentials) => {
        const response = await changePassWord(
            credentials.userId,
            credentials.oldPass,
            credentials.newPass,
        );
        return response.data;
    },
);
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.isLoggedIn = false;
            state.data = {};
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.data = action.payload.user;
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload.user),
                );
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.user;
                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload.user),
                );
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';

                if (action.payload.errCode === 0) {
                    state.data = action.payload.user;
                    localStorage.setItem(
                        'user',
                        JSON.stringify(action.payload.user),
                    );
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(changePass.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changePass.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload.errCode === 0) {
                    state.data = action.payload.user;
                    localStorage.setItem(
                        'user',
                        JSON.stringify(action.payload.user),
                    );
                }
            })
            .addCase(changePass.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectUser = (state) => {
    return state.userReducers.data;
};

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
