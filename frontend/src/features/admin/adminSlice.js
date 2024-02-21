import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../../api/adminAPI";


const INITIAL_STATE = {
    admin: localStorage.getItem('adminAuth') || false,
    users:[],
    tempUsers:[],
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
    reducers:{
        adminRemove : (state , action ) => {
            state.admin = false;
            state.success = false;
        },
        usersDataUpdate : (state , action) => {
            state.users = action.payload;
        },
        temUserUpdate : (state, action) => {
            state.tempUsers = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(adminAuth.fulfilled, (state, action) => {
            localStorage.setItem('adminAuth',true);
            state.error = null;
            state.message = null;
            state.admin = true;
        })

        builder.addCase(adminAuth.rejected , (state, action) => {
            state.error = true;
            state.message = action.payload.message;
        })
    }
})


export const { adminRemove, usersDataUpdate, temUserUpdate } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;