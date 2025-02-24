import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const register = async(username: string, password: string) => {
    return axios.post(`${API_URL}/register`, {username, password});
}

export const login = async(username: string, password: string) => {
    return axios.post(`${API_URL}/login`, {username, password});
}