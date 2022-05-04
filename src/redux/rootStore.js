import { combineReducers, legacy_createStore as createStore } from "redux";
import dummyReducer from './reducers'

const rootReducers = combineReducers({dummyReducer})

const store = createStore(rootReducers)

export default store