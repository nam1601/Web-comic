import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commentAComic, getAllComment } from '~/service/BEService';

export const fetchCommentList = createAsyncThunk(
    'listComment/fetchCommentList',
    async (userId) => {
        const response = await getAllComment(userId);
        return response.data;
    },
);
// export const commentComic = createAsyncThunk(
//     'listComment/comment',
//     async (credentials)=> {
//         try {
//             const response = await commentAComic(credentials)
//         } catch (error) {
//             throw(error)
//         }
//     }
// )
const commentSlice = createSlice({
    name: 'listComment',
    initialState: {
        allComment: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCommentList.pending, (state) => {
            state.status = 'loading'; // Đang tải dữ liệu
        });

        // Xử lý action creator fetchComicFollow.fulfilled
        builder.addCase(fetchCommentList.fulfilled, (state, action) => {
            state.status = 'succeeded'; // Tải dữ liệu thành công
            state.allComment = action.payload.data; // Lưu danh sách truyện follow vào state
        });

        // Xử lý action creator fetchComicFollow.rejected
        builder.addCase(fetchCommentList.rejected, (state, action) => {
            state.status = 'failed'; // Tải dữ liệu thất bại
            state.error = action.error.message; // Lưu thông báo lỗi vào state
        });
    },
});
export const selectAllComment = (state) => {
    // console.log('commentSLice: ', state.commentReducers.allComment);
    return state.commentReducers.allComment;
};
export default commentSlice.reducer;
