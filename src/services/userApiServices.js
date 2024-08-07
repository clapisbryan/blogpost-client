import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (payload) => {
    try {
        const { data } = await axios.post(`${API_URL}/users/register`, {
            username: payload.username,
            email: payload.email,
            password: payload.password
        })
        return data
    } catch (error) {
        console.log(error);
    }
}

export const login = async (payload) => {
    try {
        const { data } = await axios.post(`${API_URL}/users/login`, {
            email: payload.email,
            password: payload.password
        })
        return data
    } catch (error) {
        console.log(error);
    }
}
export const userDetails = async (token) => {
    try {
        const { data } = await axios.get(`${API_URL}/users/details`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.log(error);
    }
}