import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants';


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