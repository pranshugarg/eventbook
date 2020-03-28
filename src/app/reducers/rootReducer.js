import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import { reducer as FormReducer } from 'redux-form';

//all reducers are to be included in root reducer
const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: eventReducer
})

export default rootReducer;