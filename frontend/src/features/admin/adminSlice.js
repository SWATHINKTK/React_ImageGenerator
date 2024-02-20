import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../../api/adminAPI";


const INITIAL_STATE = {
    admin: localStorage.getItem('adminAuth') || false,
    loading:null,
    error:null,
    message:null,
    success:null

}

export const adminAuth = createAsyncThunk(
    'admin/login',
    async( adminCredential, { rejectWithValue } ) => {
        try {
            return await adminLogin(adminCredential);
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const adminAuthSlice= createSlice({
    name:'adminAuth',
    initialState:INITIAL_STATE,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(adminAuth.fulfilled, (state, action) => {
            console.log('fsfslsjlfaj')
            localStorage.setItem('adminAuth',true);
            state.error = null;
            state.message = null;
            state.admin = true;
        })

        builder.addCase(adminAuth.rejected , (state, action) => {
            console.log("rttyy",action.payload)
            state.error = true;
            state.message = action.payload.message;
        })
    }
})


export default adminAuthSlice.reducer;