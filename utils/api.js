import Axios from 'axios';

let config = {
    baseURL: 'http://localhost:3000',//process.env.REACT_APP_BASE_URL,
    timeout: 4000,
    headers: { 'X-Custom-Header': 'Vohnt' },
};

const api = Axios.create(config);

api.interceptors.request.use((existingConfig) => {
    if (localStorage.getItem('token')) {
        existingConfig.headers.Authorization = 'token ' + localStorage.token;
    }
    return existingConfig;
});

export default api;