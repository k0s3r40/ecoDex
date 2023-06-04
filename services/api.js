import axios from 'axios';

const API_URL = 'http://your-backend-url/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? {headers: {'Authorization': `Bearer ${token}`}} : {};
};

export const processImage = async (image) => {
    const response = await axios.post(`${API_URL}/findings/process_image`, image, getAuthHeaders());
    return response.data;
};

export const getMyFindings = async () => {
    const response = await axios.get(`${API_URL}/findings/my_findings`, getAuthHeaders());
    return response.data;
};

export const getFindingById = async (id) => {
    const response = await axios.get(`${API_URL}/findings/${id}`, getAuthHeaders());
    return response.data;
};

export const getUserData = async () => {
    const response = await axios.get(`${API_URL}/user`, getAuthHeaders());
    return response.data;
};


export const loginApi = async (data) => {
    const response = await axios.post(`${API_URL}/login/`, data);
    return response.data;
};

export const registerApi = async (data) => {
    const response = await axios.post(`${API_URL}/register/`, data);
    return response.data;
};


