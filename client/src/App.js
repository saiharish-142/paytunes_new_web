// import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import React, { useReducer } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {Initialstate,reducer} from './reducer/reducer'
export const Usercontext=React.createContext()


function App() {

  const [state,dispatch]=useReducer(reducer,Initialstate)

  return (
    <Usercontext.Provider value={{state,dispatch}}>
    <div className="App">
      <BrowserRouter>
      <Route 
      path='/login'
      render={()=>(<Login/>)}
      exact
      />
      </BrowserRouter>
    </div>
    </Usercontext.Provider>
  );
}

export default App;
