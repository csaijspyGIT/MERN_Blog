import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tab: ''
};

const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        changeTab: (state, action) => {
            state.tab = action.payload
        }
    }
})

export const { changeTab } = tabSlice.actions;
export default tabSlice.reducer;