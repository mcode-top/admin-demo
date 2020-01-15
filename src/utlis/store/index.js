import Vue from 'vue';
import Vuex from 'vuex';
import {postData} from "../api";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: "",
    userInfo:{},
  },
  mutations: {
    "SET_TOKEN": function (state, value) {
      sessionStorage.setItem('token', value);
      state.token = value;
    },
    "SET_USERINFO":function (state,value) {
      Object.assign(state.userInfo,value);
    }
  },
  actions: {
    login({commit}, userInfo) {
      const {username, password} = userInfo;
      return new Promise((resolve, reject) => {
        postData('login', {username, password},
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(res => {
          if(res.data.code===200){
            let data=res.data.data;
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            commit('SET_TOKEN', data['token']);
            commit('SET_USERINFO', data);
            resolve(data);
          }else{
            reject({message:res.data.message,code:res.data.code});
          }
        }).catch(err=>{
          reject(err);
        });
      })

    }
  }
});
export default store;

