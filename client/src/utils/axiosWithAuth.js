import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('toke');
    return axios.create({
        baseURL: 'http://localhost:5000/api',
        header: {
            Authorization: token
        }
    })
}