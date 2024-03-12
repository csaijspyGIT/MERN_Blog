import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    loading: false,
    post: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createPostSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.post = action.payload;
        },
        createPostError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const { createPostStart, createPostSuccess, createPostError } = postSlice.actions;
export default postSlice.reducer;