import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/navbar';

import { Logging } from './context/context';
import { Authentification } from './context/context';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [userID, setUserID] = useState("")

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

