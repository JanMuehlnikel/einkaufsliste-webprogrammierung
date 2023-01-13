import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/navbar';

import { Logging } from './context/context';
import { Authentification } from './context/context';

function App() {
  const [userID, setUserID] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  // get items from local storage
  useEffect(() => {
    const item = localStorage.getItem('userID');
    if (item) {
      setUserID(item);
    }
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('loggedIn');
    if (item) {
      setLoggedIn(item);
    }
  }, []);

  // store items in local storage
  useEffect(() => {
    localStorage.setItem("userID", userID)
  }, [userID])

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn)
  }, [loggedIn])



  return (
    <div className='App'>

      <Logging.Provider value={{loggedIn, setLoggedIn}}>
      <Authentification.Provider value={{userID, setUserID}}>

        <Navigation></Navigation>

        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/list" element={<ListPage></ListPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        </Routes>

      </Authentification.Provider>
      </Logging.Provider>

    </div>

  );
}

export default App;

