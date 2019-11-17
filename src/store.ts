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
    ldDataLoaded: false,
    // code
    selectedSourceMap: {},
    currentSourceName: '',
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
          case 'template':
            userDefObjDivType.template.push(ldData);
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
    setLdDataLoaded(state, loaded: boolean) {
      state.ldDataLoaded = loaded;
    },
    addSelectedSourceMap(state, sourceMap: any) {
      const currentSourceMap: any = state.selectedSourceMap;
      const sourceMapKey: string = Object.keys(sourceMap)[0];
      // この形式で保管する { source_code_id: {source_code_object}, }
      currentSourceMap[sourceMapKey] = sourceMap[sourceMapKey];
      state.selectedSourceMap = currentSourceMap;
    },
    setCurrentSourceName(state, currentSourceName: string) {
      state.currentSourceName = currentSourceName;
    },
  },
  actions: {
    setLdDataSource({ commit }, ldData: object) {
      commit('setLdDataSource', ldData);
    },
    setLdDataUserDefList({ commit }, ldDataUserDefList: UserDefinition[]) {
      commit('setLdDataUserDefList', ldDataUserDefList);
    },
    setLdDataLoaded({ commit }, loaded: boolean) {
      commit('setLdDataLoaded', loaded);
    },
    addSelectedSourceMap({ commit }, sourceMap: {}) {
      commit('addSelectedSourceMap', sourceMap);
    },
    setCurrentSourceName({ commit }, currentSourceName: string) {
      commit('setCurrentSourceName', currentSourceName);
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
    getLdDataLoaded(state) {
      return state.ldDataLoaded;
    },
    getSourceMapByDefId(state) {
      return (defId: number) => {
        const currentSourceMap: any = state.selectedSourceMap;
        return currentSourceMap[defId];
      };
    },
    getCurrentSourceName(state) {
      return state.currentSourceName;
    },
  },
});
