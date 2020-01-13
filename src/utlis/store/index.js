import Vue from 'vue';
import Vuex from 'vuex';
import {postData} from "../api";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    "SET_TOKEN": function (state, value) {
      sessionStorage.setItem('token', value);
      state.token = value;
    }
  },
  actions: {
    login({commit}, userInfo) {
      const {username, password} = userInfo;
      postData("login", {username, password}).then(res => {
        if (res.data.code === 200) {
          let data = res.data.msg;
          commit('SET_TOKEN', data['token']);
        }
      })
    }
  }
});
export default store;

