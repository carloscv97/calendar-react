import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startChecking, startLogin, startLogout, startRegister } from '../../../redux/ducks/authDucks';
import { types } from '../../../redux/types/types';

jest.mock('sweetalert2', () => ({
   fire: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares ); 
const initState = {};
let store = mockStore( initState )

Storage.prototype.setItem = jest.fn()
Storage.prototype.clear = jest.fn()

let token = ''

describe('Pruebas en el auth  Duck', () => {

   beforeEach(() => {
      store = mockStore( initState );
      jest.clearAllMocks();
   })

   test('startLogin correct', async() => {
      
      await store.dispatch( startLogin('ccordoba@gmail.com','123456') );
      
      const actions = store.getActions();
      expect( actions[0] ).toEqual({
         type: types.authLogin,
         payload: {
            uid: expect.any(String),
            name: expect.any(String)
         }
      })

      expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String))
      expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))

   });

   test('startLogin Incorrect', async() => {

      await store.dispatch( startLogin('ccordoba@gmail.com','1234569') );
      const actions = store.getActions();
      expect(actions).toEqual([])

      expect(Swal.fire).toHaveBeenCalledWith("Error", "Password Invalid", "error");

   });

   // test('startRegister correct', async() => {

   //    await store.dispatch( startRegister('Test','test@test.com','123456') );
   //    const actions = store.getActions();

   // })

   test('startRegister incorrect there is already an account', async () => {
      
      await store.dispatch( startRegister('Test','test@test.com','123456') );
      const actions = store.getActions();
     
      expect(actions).toEqual([])
      expect(Swal.fire).toHaveBeenCalledWith("Error", "There is already an account with that email", "error");

   }) 

   test('startChecking correct', async() => {
      await store.dispatch( startChecking() );
      const actions = store.getActions();
      console.log(actions);
   })
   

   test('Logout correct', async() => {
      await store.dispatch( startLogout() );
      const actions = store.getActions();
      expect( localStorage.clear ).toHaveBeenCalledTimes(1)
   })
   
   
})
