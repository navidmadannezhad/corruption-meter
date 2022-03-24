import Vuex from "vuex";
import Vue from "vue";
import { get_data } from "./data.api";

Vue.use(Vuex);

const state = {
    data: []
}

const mutations = {
    SET_DATA(state, data){
        state.data = data;
    }
}

const actions = {
    fetch_data({ commit }){
        get_data()
        .then(res => {
            console.log("hio "+res);
            commit("SET_DATA", res.data);
        })
        .catch(err => {
            console.log("error is "+err);
        })
    }
}

const store = () => new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})

export default store;