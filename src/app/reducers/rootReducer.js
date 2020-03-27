import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/testReducer';

//all reducers are to be included in root reducer
const rootReducer = combineReducers({
    test: testReducer
})

export default rootReducer;