import Vuex from "vuex";
import Vue from "vue";
import { get_corruption_data, get_geoJSON_data } from './rank.api.js';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        corruption_data: null,
        geoJSON_data: null
    },

    mutations: {
        SET_CORRUPTION_DATA(state, data){
            state.corruption_data = data;
        },

        SET_GEOJSON_DATA(state, data){
            state.geoJSON_data = data;
        }
    },

    actions: {
        fetch_corruption_data({ commit }){
            get_corruption_data()
            .then(res => {
                commit("SET_CORRUPTION_DATA", res.data);
            })
            .catch(err => {
                console.log("error in vuex, error is "+err);
            })
        },

        fetch_geoJSON_data({ commit }){
            get_geoJSON_data()
            .then(res => {
                commit("SET_GEOJSON_DATA", res.data);
            })
            .catch(err => {
                console.log("error in vuex, error is "+err);
            })
        },
    }
})

export default store;