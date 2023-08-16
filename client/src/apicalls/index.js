import axios from 'axios';

// don't really understand this!
export const axiosInstance = axios.create({
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    } // send headers in the form of authorization
});

