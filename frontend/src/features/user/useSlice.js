import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { editUser, profilePictureUpdate, userLogin } from "../../api/userAPI";
import { toast } from "react-toastify";


const INITIAL_STATE = {
    user:null,
    loading:null,
    error:null,
    success:null

}

const checkUserExist = () => {
    const user = localStorage.getItem('userAuth');
    INITIAL_STATE.user = JSON.parse(user);
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

export const updateDetails = createAsyncThunk(
    'user/editprofile',
    async(editUserData, { rejectWithValue }) => {
        try {
            return await editUser(editUserData);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const changeProfilePicture = createAsyncThunk(
    'user/updateProfilePicture',
    async(profileImage, { rejectWithValue }) => {
        try {
            return await profilePictureUpdate(profileImage);
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const userSlice = createSlice({
    name:'user',
    initialState:checkUserExist(),
    reducers:{
        deleteUserData : (state,action) => {
            state.user = null;
            state.success = null;
        },
        updateUserDetails : (state, action) => {
            console.log(action)
            state.user = action.payload.user;
            localStorage.setItem('userAuth', JSON.stringify(action.payload.user))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userAuth.pending, (state) => {
            console.log('loading')
            state.loading = true;
        });
        
        builder.addCase(userAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            console.log(action.payload.u)
            state.user = action.payload.user;
            localStorage.setItem('userAuth',JSON.stringify(action.payload.user));
        });

        builder.addCase(userAuth.rejected, (state,action) => {
            console.log('error',action.payload)
            state.error = true;
            state.success = false;
            state.message = action.payload.message;
        })

        builder.addCase(updateDetails.fulfilled , (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('userAuth',JSON.stringify(action.payload.user))
            toast.success('Profile is Updated.');
        })

        builder.addCase(updateDetails.rejected, ( state, action ) => {
            toast.error(action.payload.message);
        })

        builder.addCase(changeProfilePicture.fulfilled, (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('userAuth',JSON.stringify(action.payload.user))
            toast.success('Profile is Updated.');
        })
        
    }
})

export const { deleteUserData,updateUserDetails } = userSlice.actions;

export default userSlice.reducer;