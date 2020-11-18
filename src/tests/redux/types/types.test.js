import { types } from '../../../redux/types/types';
import '@testing-library/jest-dom';

describe(' Test on Types.js', () => {
   test('Los Types deben de ser iguales', () => {
      
      expect(types).toEqual({

         uiOpenModal: '[ui] Open modal',
         uiCloseModal: '[ui] Close modal',
      
         eventSetActive: '[event] Set Active',
         eventStartnew: '[event] Start add new',
         eventClearActive: '[event] Clear Active Note',
         eventAddNew: '[event] Add new',
         eventUpdated: '[event] Event Updated',
         eventDeleted: '[event] Event Deleted',
         eventLoaded: '[event] Events loaded',
         eventEmpty: '[event] Events Empty',
      
         authCheckingFinish: '[auth] Finish checking login state',
         authStartLogin: '[auth] Start login',
         authLogin: '[auth] Login',
         authStartRegister: '[auth] Start Register',
         authStartTokenRenew: '[auth] Start token renew',
         authLogout: '[auth] Logout'
         
      })

   })
   
})
