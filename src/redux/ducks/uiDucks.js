import { types } from "../types/types";

/**
 *  INITIAL DATA
 */
const initialState = {
   modalOpen: false,
}

/**
*   REDUCER
*/
export const uiReducer = (state = initialState, action) => {

   switch ( action.type ) {
      case types.uiOpenModal:
         return {
            ...state,
            modalOpen: true
         };

      case types.uiCloseModal:
         return {
            ...state,
            modalOpen: false
         };
   
      default:
         return initialState;
   }

}

/**
 *  UI ACTIONS
 */
export const uiOpenModal = () => ({ type: types.uiOpenModal });
export const uiCloseModal = () => ({ type: types.uiCloseModal });
