import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../../api/userAPI";

const INITIAL_STATE = {
    user:null,
    loading:null,
    error:null,
    success:null

}

const checkUserExist = () => {
    const user = localStorage.getItem('userAuth');
    INITIAL_STATE.user = user;
    return INITIAL_STATE
}



export const userAuth = createAsyncThunk(
    'user/login',
    async(userCredential, { rejectWithValue })=>{
        try {
            return await userLogin(userCredential)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }

    }
)


const userSlice = createSlice({
    name:'user',
    initialState:checkUserExist(),
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(userAuth.pending, (state) => {
            console.log('loading')
            state.loading = true;
        });
        
        builder.addCase(userAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload.user;
            localStorage.setItem('userAuth',JSON.stringify(action.payload.user));
        });

        builder.addCase(userAuth.rejected, (state,action) => {
            console.log('error',action.payload)
            state.error = true;
            state.success = false;
            state.message = action.payload.message;
        })
        
    }
})

export default userSlice.reducer;