import Vue from 'vue';
import Vuex from 'vuex';
import UserDefinition from '@/interfaces/UserDefinition';
import UserDefinitionDivideType from '@/classes/UserDefinitionDivideType';
import RngdUtil from '@/classes/RngdUtil';

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
      const sourceMapKey: string = Object.keys(sourceMap)[0];
      // ソースマップキーが存在しない場合のみ追加を行う
      if (!state.selectedSourceMap.hasOwnProperty(sourceMapKey)) {
        const currentSourceMap: any = state.selectedSourceMap;

        // この形式で保管する { source_code_id: {source_code_object}, }
        currentSourceMap[sourceMapKey] = sourceMap[sourceMapKey];
        state.selectedSourceMap = currentSourceMap;
      }
    },
    removeSelectedSourceMap(state, sourceMapKey: string) {
      let beforeSelectedSourceMap: any = state.selectedSourceMap;
      const newSelectedSourceMap: any = {};
      Object.keys(beforeSelectedSourceMap).forEach( (currentKey) => {
        // 削除対象のキーではない場合は保持しておく
        if (sourceMapKey !== currentKey) {
          newSelectedSourceMap[currentKey] = beforeSelectedSourceMap[currentKey];

        }
      });
      state.selectedSourceMap = newSelectedSourceMap;
      // state.currentSourceName = fallbackSourceName;
      beforeSelectedSourceMap = null;
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
    removeSelectedSourceMap({ commit }, sourceMapKey: string) {
      commit('removeSelectedSourceMap', sourceMapKey);
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
      return (defId: string) => {
        const currentSourceMap: any = state.selectedSourceMap;
        return currentSourceMap[defId];
      };
    },
    getSelectedSourceMap(state) {
      return state.selectedSourceMap;
    },
    getCurrentSourceName(state) {
      return state.currentSourceName;
    },
    getSourceCodeRaw(state) {
      return (defId: string) => {
        const currentSourceMap: any = state.selectedSourceMap;
        const currentSource: any = currentSourceMap[defId];
        const codeType = currentSource.definitionType;
        let currentSourceCodeRaw = '';
        switch (codeType) {
            case 'rest':
                currentSourceCodeRaw = JSON.stringify(currentSource.definitionData.elementProperties);
                break;
            case 'template':
                currentSourceCodeRaw = currentSource.definitionData.elementProperties.defaultTemplate;
                break;
            case 'others':
                currentSourceCodeRaw = JSON.stringify(currentSource.definitionData.elementProperties);
                break;
            case 'javascript':
                currentSourceCodeRaw = currentSource.definitionData.elementProperties.script;
                break;
            case 'sql':
                currentSourceCodeRaw = currentSource.definitionData.elementProperties.query;
                break;
        }
        return currentSourceCodeRaw;
      };
    },
    getSourcePrimaryKeyByObj(state) {
      return (targetObj: UserDefinition) => {
        return RngdUtil.getSourcePrimaryKey(targetObj);
      };
    },
  },
});
