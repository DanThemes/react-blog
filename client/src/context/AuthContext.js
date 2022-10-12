import { createContext, useReducer } from 'react';
import reducer from './AuthReducer';

export const AuthContext = createContext();

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null
}

export const ContextProvider = ({children}) => {
  const [ state, dispatch ] = useReducer(reducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}