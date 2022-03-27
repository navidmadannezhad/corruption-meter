import httpClient from "./http";
import axios from "axios";

const get_corruption_data = () => httpClient.get('/api/get-data/');

const get_geoJSON_data = () => axios.get("/countries.geojson");

export { get_corruption_data, get_geoJSON_data };