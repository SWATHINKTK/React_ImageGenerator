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
