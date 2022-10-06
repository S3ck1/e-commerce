import { createSlice } from '@reduxjs/toolkit';

export const showSlice = createSlice({
    name: 'show',
    initialState: false,
    reducers: {
        handleClose: () => false,
        handleShow: () => true,
    }
})

export const { handleClose, handleShow } = showSlice.actions;

export default showSlice.reducer;
