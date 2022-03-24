import httpClient from "./http";

const get_data = () => httpClient.get("/api/get-data/");

export { get_data };