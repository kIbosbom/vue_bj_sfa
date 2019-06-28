import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LoginUser: sessionStorage.getItem('LoginUser')
      ? JSON.parse(sessionStorage.getItem('LoginUser'))
      : null,
    NoticeList: []
  },
  mutations: {
    initUser(state, payload) {
      state.LoginUser = payload;
    },
    initNoticeList(state, payload) {
      state.NoticeList = payload;
    },
    unshiftMoreNotice(state, payload) {
      state.NoticeList.unshift(...payload);
    },
    pushMoreNotice(state, payload) {
      state.NoticeList.push(...payload);
    }
  },
  actions: {},
  getters: {
    getLoginUser(state) {
      return state.LoginUser;
    }
  }
});
