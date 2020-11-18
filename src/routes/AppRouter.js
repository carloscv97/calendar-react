import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
   BrowserRouter as Router,
   Switch,
   Redirect
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../redux/ducks/authDucks';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

   const dispatch = useDispatch();
   const { checking, uid } = useSelector(state => state.auth)
   useEffect(() => {
      dispatch( startChecking() )
   }, [dispatch])

   if (checking) {
      return <h5>Waiting...!</h5>
   }

   return (
      <Router>
         <div>
            <Switch>
               <PublicRoute exact path="/login" component={LoginScreen} isAuth={ !!uid }/>
               <PrivateRoute exact path="/" component={CalendarScreen} isAuth={ !!uid }/>
               <Redirect to="/" />
            </Switch>
         </div>
      </Router>
   )
}
