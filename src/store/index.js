import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'

Vue.use(Vuex)
// instead of export default  here save in var to use it  ==> save data in store whivh i will get from post array getted from db and save in store
const store = new Vuex.Store({
  state: {
    //one user profile for one and alot of posts in array
    UserProfile: {},
    posts: []
  },
  getters: {
  },
  //
  mutations: {
    //set the state of user 
  },
  actions: {
  },
  modules: {
  }
})
export default store
