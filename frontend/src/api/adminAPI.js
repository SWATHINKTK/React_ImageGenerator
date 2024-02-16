import axios from "axios";

export const adminLogin = async() => {
    try {
        const response = await axios.post('/api/api/admin/login');
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }

}