import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const getBlogPost = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/blogs/getPosts`);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const addBlogPost = async (payload) => {
    
    try {
        const { data } = await axios.post(`${API_URL}/blogs/addPost`, {
            title: payload.title,
            content: payload.content,
            author: payload.author
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        console.log(error);
    }
}

export const deleteBlogPost = async (postId) => {
    try {
        const { data } = await axios.delete(`${API_URL}/blogs/deletePost/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        console.log(error);
    }
}

export const updateBlogPost = async (payload) => {
    try {
        const { data } = await axios.patch(`${API_URL}/blogs/updatePost/${payload.id}`, {
            title: payload.title,
            content: payload.content,
            author: payload.author
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (payload) => {
    try {
        const { data } = await axios.patch(`${API_URL}/blogs/addComment/${payload.id}`, {
            comment: payload.comment
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        console.log(error);
    }
}

export const getComments = async (postId) => {
    try {
        const { data } = await axios.get(`${API_URL}/blogs/getComments/${postId}`);
        return data
    } catch (error) {
        console.log(error);
    }
}