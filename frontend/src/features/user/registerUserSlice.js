import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { registerUserAPI } from '../../api/userAPI';

const INITIAL_STATE = {
    success:null,
    message:'',
    loading:null,
    error:null
}


export const registerUser = createAsyncThunk(
    'user/register',
    async(userCredential, { rejectWithValue }) => {  
        try {
            return await registerUserAPI(userCredential);
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const registerUserSlice = createSlice({
    name:'registerUser',
    initialState:INITIAL_STATE,
    reducers:{
        clear: (state) => {
                    state.success = INITIAL_STATE;
                }
    },
    extraReducers:(builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.message = action.payload.message;
        });

        builder.addCase(registerUser.rejected, (state,action) => {
            state.error = true;
            state.message = action.payload.message;
        })
    }
})


export const { clear } = registerUserSlice.actions

export default registerUserSlice.reducer