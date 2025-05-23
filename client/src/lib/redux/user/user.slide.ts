
import axiosCustomize from '@/lib/axios.customize';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
}

export const loginUserAPIs = createAsyncThunk(
    'user/loginUserAPIs',
    async (user: any) => {
        const res = await axiosCustomize.post('v1/login', user)
        return res.data
    }
)

export const logoutUserAPIs = createAsyncThunk(
    'user/logoutUserAPIs',
    async () => {
        const res = await axiosCustomize.delete('v1/logout')

        return res.data
    }
)

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginUserAPIs.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(loginUserAPIs.rejected, (state, action) => {
            state.currentUser = null
        })
        builder.addCase(logoutUserAPIs.fulfilled, (state, action) => {
            state.currentUser = null
        })
        builder.addCase(logoutUserAPIs.rejected, (state, action) => {
            state.currentUser = null
        })
    }
})

export const { } = userSlide.actions;

export const selectedCurrentUser = (state: any) => state?.user?.currentUser;

export default userSlide.reducer;