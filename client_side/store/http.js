import axios from "axios"

const httpClient = axios.create({
    baseURL: process.env.BASE_URL
})

export default httpClient;