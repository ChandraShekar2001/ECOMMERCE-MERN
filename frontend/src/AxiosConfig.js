import axios from 'axios';

export const getBaseUrl = () => {
    let url;
    switch (process.env.REACT_APP_ENV) {
        case 'production':
            url = 'https://backend-c5ug.onrender.com/';
            break;
        case 'development':
        default:
            url = 'http://localhost:4000/api/v1';
    }
    return url;
}

export default axios.create({
    baseURL: getBaseUrl(),
});