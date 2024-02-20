import axios from "axios";

export const userLogin = async(userCredential) => {
    try {
        const response = await axios.post('/api/api/login',userCredential);
        const data = response.data;
        return data;

    } catch (error) {
        throw error;
    }
}


export const registerUserAPI = async (userData) => {

    try {

        const response = await axios.post('/api/api/register',userData);
        const data = response.data;
        return data;

    } catch (error) {
        throw error;    
    }
}


export const editUser = async(updateData) => {
    try {
        const response = await axios.put('/api/api/edituser',updateData);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export const userLogout = async () => {
    try {
        const response = await axios.post('/api/api/logout');
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}

export const profilePictureUpdate = async (profileImg) => {
    try {
        const response = await axios.patch('/api/api/updateProfile',profileImg);
        const userUpdatedData = response.data;
        return userUpdatedData;
    } catch (error) {
        throw error;
    }
}