import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFollowList } from '~/service/BEService'; // Đường dẫn đến API để lấy danh sách truyện follow

// Action creator async để lấy danh sách truyện follow từ API
export const fetchComicFollow = createAsyncThunk(
    'listComicFollow/fetchComicFollow',
    async (userId) => {
        const response = await getFollowList(userId); // Gọi API để lấy danh sách truyện follow
        return response.data; // Trả về dữ liệu từ API
    },
);
export const followComic = createAsyncThunk(
    'listComicFollow/followComic',
    async (credentials) => {
        try {
            const response = await getFollowList('/api/followComic', {
                credentials,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
);

// Slice của store
const followSlice = createSlice({
    name: 'listComicFollow',
    initialState: {
        comics: [], // Danh sách truyện follow ban đầu
        status: 'idle', // Trạng thái khởi tạo
        error: null, // Lỗi (nếu có)
    },
    reducers: {},
    extraReducers: (builder) => {
        // Xử lý action creator fetchComicFollow.pending
        builder.addCase(fetchComicFollow.pending, (state) => {
            state.status = 'loading'; // Đang tải dữ liệu
        });

        // Xử lý action creator fetchComicFollow.fulfilled
        builder.addCase(fetchComicFollow.fulfilled, (state, action) => {
            state.status = 'succeeded'; // Tải dữ liệu thành công
            state.comics = action.payload.comics; // Lưu danh sách truyện follow vào state
        });

        // Xử lý action creator fetchComicFollow.rejected
        builder.addCase(fetchComicFollow.rejected, (state, action) => {
            state.status = 'failed'; // Tải dữ liệu thất bại
            state.error = action.error.message; // Lưu thông báo lỗi vào state
        });
        builder.addCase(followComic.pending, (state) => {
            state.status = 'loading'; // Đang tải dữ liệu
        });

        // Xử lý action creator fetchComicFollow.fulfilled
        builder.addCase(followComic.fulfilled, (state, action) => {
            state.status = 'succeeded'; // Tải dữ liệu thành công
            state.comics = action.payload.comics; // Lưu danh sách truyện follow vào state
        });

        // Xử lý action creator fetchComicFollow.rejected
        builder.addCase(followComic.rejected, (state, action) => {
            state.status = 'failed'; // Tải dữ liệu thất bại
            state.error = action.error.message; // Lưu thông báo lỗi vào state
        });
    },
});
export const selectFollowList = (state) => {
    return state.followReducers.comics;
};

export default followSlice.reducer;
