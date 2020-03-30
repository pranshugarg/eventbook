import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';
import { fetchSampleData } from '../../app/data/mockApi'
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/asyncActions';   
import { toastr } from 'react-redux-toastr';

export const createEvent = event => {
    return async dispatch => {
            try{
                dispatch({
                    type: CREATE_EVENT,
                    payload:{event} 
                })
                toastr.success('Success!', 'Event has been created');
            }
            catch (error){
                toastr.error('Oops', 'Something went wrong');
            }
        }
}

export const updateEvent = event => {
     return async dispatch => {
            try{
                dispatch({
                    type: UPDATE_EVENT,
                    payload:{event} 
                })
                toastr.success('Success!', 'Event has been updated');
            }
            catch (error){
                toastr.error('Oops', 'Something went wrong');
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

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

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