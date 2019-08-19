import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-de22d.firebaseio.com/'
});

export default instance;
