import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.BASE_URL,
});
console.log(process.env.BASE_URL);
export default httpClient;