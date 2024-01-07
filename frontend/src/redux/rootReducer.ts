import { combineReducers, Reducer } from 'redux';

import { reducer as authReducer } from './auth';
import { reducer as crudReducer } from './crud';
import { reducer as erpReducer } from './erp';
import { reducer as settingsReducer } from './settings';
import { reducer as translateReducer } from './translate';

// Combine all reducers.

const rootReducer = combineReducers({
  auth: authReducer as Reducer<any>,
  crud: crudReducer as Reducer<any>,
  erp: erpReducer as Reducer<any>,
  settings: settingsReducer as Reducer<any>,
  translate: translateReducer as Reducer<any>,
});

export default rootReducer;
