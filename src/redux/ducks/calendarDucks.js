import axios from "axios";
import Swal from "sweetalert2";
import { prepareEvents } from "../../helpers/prepareEvents";
import { types } from "../types/types";

/**
*  INITIAL DATA
*/
const initialState = {
   events: [],
   activeEvent: null
}

const baseURL = process.env.REACT_APP_API_URL

/**
*   REDUCER
*/
export const calendarReducer = (state = initialState, action) => {

   switch (action.type) {
      case types.eventSetActive:
         return {
            ...state,
            activeEvent: action.payload
         }

      case types.eventClearActive:
         return {
            ...state,
            activeEvent: null
         }

      case types.eventAddNew:
         return {
            ...state,
            events: [ ...state.events, action.payload ]
         }


      case types.eventUpdated:
         return {
            ...state,
            events: state.events.map(
               e => (e.id === action.payload.id) ? action.payload : e
            )
         }

      case types.eventDeleted:
         return {
            ...state,
            events: state.events.filter(
               e => ( e.id !== state.activeEvent.id)
            ),
            activeEvent: null
         }

      case types.eventLoaded:
         return {
            ...state,
            events: [ ...action.payload ]
         }

      case types.eventEmpty:
         return initialState

      default:
         return state;
   }

}

/**
*   CALENDAR ACTIONS
*/
export const eventStartNew = (event) => {
   return async (dispatch, getState) => {

      const token = localStorage.getItem('token') || '';
      const { uid, name }  = getState().auth;

      try {
         
         const resp = await axios({
            method:'POST',
            url: `${baseURL}/events`,
            headers: {
               'x-token': token
            },
            data: event
         });

         const { id } = await resp.data.event;

         event.id = id
         event.user = {
            _id: uid,
            name
         }
         
         dispatch(eventAddNew(event));

      } catch (err) {
         console.log(err.response.data);
      }
   }
}

const eventAddNew = (event) => ({
   type: types.eventAddNew,
   payload: event
});


export const eventSetActive = (event) => ({
   type: types.eventSetActive,
   payload: event
});


export const eventClearActiveNote = () => ({
   type: types.eventClearActive,
});


export const eventStartUpdate =  (event) => {
   return async (dispatch) => {

      const token = localStorage.getItem('token') || '';


      try {
         
         
         await axios({
            method:'PUT',
            url: `${baseURL}/events/${event.id}`,
            headers: {
               'x-token': token
            },
            data: event
         });

  
         dispatch( eventUpdated(event))

      } catch (err) {
         const {msg} = err.response.data;
         Swal.fire('Error',msg,'error' );
      }
   }
}

const eventUpdated = (event) => ({
   type: types.eventUpdated,
   payload : event
});

export const eventStartDelete = () => {
   return async (dispatch, getState) => {


      const token = localStorage.getItem('token') || '';
      const { id } = getState().calendar.activeEvent;
      try {
         
         
         await axios({
            method:'DELETE',
            url: `${baseURL}/events/${id}`,
            headers: {
               'x-token': token
            }
         });

  
         dispatch(eventDeleted())

      } catch (err) {
         const {msg} = err.response.data;
         Swal.fire('Error',msg,'error' );
      }
   }
}

const eventDeleted = () => ({
   type: types.eventDeleted,
});

export const eventStartLoading = () => {
   return async (dispatch) => {

      try {
         
         const token = localStorage.getItem('token') || '';
         const resp = await axios({
            method:'GET',
            url:`${baseURL}/events`,
            headers: { 'x-token': token }
         })
   
       
         const events = await prepareEvents(resp.data.events);
         
         dispatch( eventLoaded(events));

      } catch (err) {
         console.log(err.response);
      }
   }
}

const eventLoaded = (events) =>({
   type: types.eventLoaded,
   payload: events
}) 

export const eventEmpty = () => ({type: types.eventEmpty})
