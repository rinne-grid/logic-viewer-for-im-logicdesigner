import Vue from 'vue';
import Vuex from 'vuex';
import UserDefinition from '@/interfaces/UserDefinition';
import UserDefinitionDivideType from '@/classes/UserDefinitionDivideType';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ldDataSource: null,
    ldDataUserDefList: {},
    ldDataUserDefObjDivideType: {},
  },
  mutations: {
    setLdDataSource(state, ldData) {
      state.ldDataSource = ldData;
    },
    setLdDataUserDefList(state, ldDataUserDefList: UserDefinition[]) {
      state.ldDataUserDefList = ldDataUserDefList;

      const userDefObjDivType: UserDefinitionDivideType = new UserDefinitionDivideType();
      // タイプごとに分割する
      ldDataUserDefList.forEach( (ldData: UserDefinition) => {
        // console.log(ldData.categoryId);
        switch (ldData.definitionType) {
          case 'javascript':
            userDefObjDivType.js.push(ldData);
            break;
          case 'sql':
            userDefObjDivType.sql.push(ldData);
            break;
          case 'rest':
            userDefObjDivType.rest.push(ldData);
            break;
          default:
            userDefObjDivType.others.push(ldData);
        }
      });
      state.ldDataUserDefObjDivideType = userDefObjDivType;

    },
  },
  actions: {
    setLdDataSource({ commit }, ldData: object) {
      commit('setLdDataSource', ldData);
    },
    setLdDataUserDefList({ commit }, ldDataUserDefList: UserDefinition[]) {
      commit('setLdDataUserDefList', ldDataUserDefList);
    },
  },
  getters: {
    getLdDataSource(state) {
      return state.ldDataSource;
    },
    getLdDataUserDefList(state) {
      return state.ldDataUserDefList;
    },
    getLdDataUserDefObjDivideType(state) {
      return state.ldDataUserDefObjDivideType;
    },
  },
});
