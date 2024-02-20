import axios from "axios";

export const adminLogin = async(adminCredential) => {
    try {
        const response = await axios.post('/api/api/admin/login', adminCredential);
        const data = response.data;
        console.log(response.data)
        return data;
    } catch (error) {
        throw error;
    }

}