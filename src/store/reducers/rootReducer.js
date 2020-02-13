import { combineReducers } from 'redux'
import tableReducer from './table'

const rootReducer = combineReducers({
  table: tableReducer
})

export default rootReducer