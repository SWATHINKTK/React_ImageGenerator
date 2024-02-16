import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../../api/adminAPI";


const INITIAL_STATE = {
    admin:null,
    loading:null,
    error:null,
    success:null

}

export const adminAuth = createAsyncThunk(
    'admin/login',
    async( { rejectWithValue } ) => {
        try {
            return await adminLogin();
        } catch (error) {
            rejectWithValue(error.response.message)
        }
    }
)

const adminAuthSlice= createSlice({
    name:'adminAuth',
    initialState:INITIAL_STATE,
    reducers:{},
    extraReducers:(builder) => {
        // builder.addCase()
    }
})


export default adminAuthSlice.reducer;