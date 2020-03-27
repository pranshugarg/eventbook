import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';

//all reducers are to be included in root reducer
const rootReducer = combineReducers({
    test: testReducer,
    events: eventReducer
})

export default rootReducer;