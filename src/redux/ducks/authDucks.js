import axios from "axios";
import Swal from "sweetalert2";
import { types } from "../types/types";
import { eventEmpty } from "./calendarDucks";

/**
*  INITIAL DATA
*/
const initialState = {
   checking: true,
   // uid: null,
   // name: null
}

let baseURL = process.env.REACT_APP_API_URL
if (process.env.NODE_ENV === 'development') {
   baseURL = 'http://localhost:8080/api'
} else {
   baseURL = 'http://localhost:8080/api'
}


/**
*  AUTH REDUCER
*/
export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.authLogin:
         return {
            ...state,
            checking: false,
            ...action.payload
         }

      case types.authCheckingFinish:
         return {
            ...state,
            checking: false
         }

      case types.authLogout:
         return {
            checking: false
         };

      default:
         return state;
   }
}


/**
*  AUTH ACTIONS
*/
export const startLogin = (email, password) => {
   return async (dispatch) => {

      await axios.post(`${baseURL}/auth`, {
         email: email,
         password: password
      }).then( resp => {
         
         const { token, uid, name } = resp.data
         
         localStorage.setItem('token', token);
         localStorage.setItem('token-init-date', new Date().getTime());
         
         
         dispatch({
            type: types.authLogin,
            payload: {
               uid: uid,
               name: name
            }
         })

      }).catch( err => {

         const { msg: message } = err.response.data
         Swal.fire('Error', message, 'error')

      })

   }
}

export const startRegister = (name, email, password) => {
   return async (dispatch) => {

      

         await axios.post(`${baseURL}/auth/register`, {
            name: name,
            email: email,
            password: password
         }).then( resp => {
            
            const { token, uid, name } = resp.data;

            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch({
               type: types.authLogin,
               payload: {
                  uid: uid,
                  name: name
               }
            })

         }).catch( err => {
            const { msg: message } = err.response.data
            Swal.fire('Error', message, 'error')
         })

   }
}

export const startChecking = () => {
   return async (dispatch) => {

      const token = localStorage.getItem('token') || '';

      await axios({
         method: 'GET',
         url: `${baseURL}/auth/renew`,
         headers: {
            'x-token': token
         }
      }).then(resp => {

         const { name, uid } = resp.data

         dispatch({
            type: types.authLogin,
            payload: {
               uid: uid,
               name: name
            }
         })

      }).catch(error => {

         dispatch({ type: types.authCheckingFinish })
      })

   }
}

export const startLogout = () => {
   return (dispatch) => {

      localStorage.clear();
      dispatch(eventEmpty())
      dispatch({ type: types.authLogout });
      
   }
}