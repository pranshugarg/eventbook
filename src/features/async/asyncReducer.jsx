import { createReducer } from '../../app/common/util/reducerUtil';
import { ASYNC_ACTION_ERROR, ASYNC_ACTION_START, ASYNC_ACTION_FINISH } from './asyncConstants';

const initialState = {
    loading: false,
    elementName:null
}

export const aysncActionStarted = (state, payload) => {
    return {...state, loading: true, elementName:payload }
}

export const asyncActionFinished = (state, payload) => {
    return {...state, loading: false, elementName:payload}
}

export const asyncActionError = (state, payload) => {
    return {...state, loading: false, elementName:payload}
}

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: aysncActionStarted,
    [ASYNC_ACTION_FINISH]: asyncActionFinished,
    [ASYNC_ACTION_ERROR]: asyncActionError
})