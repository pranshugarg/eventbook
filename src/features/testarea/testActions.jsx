import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_FINISHED, COUNTER_ACTION_STARTED } from './testConstants';
import { asyncActionFinish } from "../async/asyncActions"
import {ASYNC_ACTION_START  } from '../async/asyncConstants';

//action creator returns a action
export const incrementCounter = () => { 
    return { //actiion
        type: INCREMENT_COUNTER 
    }
}

export const decrementCounter = () => {
    return {
        type: DECREMENT_COUNTER
    }
}

export const startCounterAction = () => {
    return {
        type: COUNTER_ACTION_STARTED
    }
}

export const finishCounterAction = () => {
    return {
        type: COUNTER_ACTION_FINISHED
    }
}

/* 
Introducing delays
as originally we are going to use firestore
and we could display (loading..) in meanwhile...
*/
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
} 

//Bcoz of thunk, **we can dispatch actions within our action creators**
export const incrementAsync = (name) => {
    return async dispatch => {
        //dispatch(asyncActionStart(name) )
        //we need to pass name 
        dispatch( {type:ASYNC_ACTION_START, payload:name } )

        await delay(1000);
        dispatch({type: INCREMENT_COUNTER})  // dispatch(incrementCounter()) // same thing
        
        dispatch(asyncActionFinish() )
    }
}

export const decrementAsync = (name) => {
    return async dispatch => {
        dispatch( {type:ASYNC_ACTION_START, payload:name } )
        
        await delay(1000);
        dispatch({type: DECREMENT_COUNTER})
       
        dispatch(asyncActionFinish() )
    }
} 

