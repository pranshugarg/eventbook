import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';
import { fetchSampleData } from '../../app/data/mockApi'
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncActions';   

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: {
            event
        }
    }
}

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            event
        }
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
}

export const fetchEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: events
    }
}

export const loadEvents = () => {
    return async dispatch => {
        try {
            //here we are making use of thunk to dispatch function from action creator 
            dispatch(asyncActionStart());  //set loading flag to true

            let events = await fetchSampleData();
            dispatch(fetchEvents(events));
            //dispatch({ type: FETCH_EVENTS, payload: {events} } )
            
            dispatch(asyncActionFinish());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }
}