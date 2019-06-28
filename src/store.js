import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

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
      state.NoticeList = _.uniqBy(payload, 'id');
    },
    unshiftMoreNotice(state, payload) {
      state.NoticeList.unshift(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    pushMoreNotice(state, payload) {
      state.NoticeList.push(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    setNoticeReaded(state, payload) {
      let itemIndex = state.NoticeList.findIndex(item => item.id == payload);
      let k = state.NoticeList[itemIndex];
      k.isRead = true;
      state.NoticeList.splice(itemIndex, 1, k);
    }
  },
  actions: {},
  getters: {
    getLoginUser(state) {
      return state.LoginUser;
    }
  }
});
