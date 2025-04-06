import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Switch } from '@mui/material'
import Send from "@mui/icons-material/Send" 
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

import { UserProvider, useUser } from './context/userContext.jsx'
import SignIn from './components/Signin.jsx'
import Dashboard from './components/Dashboard.jsx'
import { ToggleProvider } from './context/ToggleContext.jsx'
import { useToggle } from './context/ToggleContext.jsx'
import ScreenWithAi from './components/ScreenWithAi.jsx'
import AgentStatus from './components/AgentStatus.jsx'
import Shortlidted from './components/Shortlidted.jsx'
import Interview from './components/Interview.jsx'


function AppRoutes() {
  const [dark, setDark] = useState(false);
  const {user,setUser} = useUser();
   const {toggleDarkMode, setToggleDarkMode} = useToggle();
  useEffect(()=>{
    //  axios profile
    // setUser profile
    console.log(user);
    // setDark(true);
    setUser({name:"xyz"});
  },[])

  return (
    <div className={toggleDarkMode?"dark":""}> 
    {user? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ScreenWithAi" element={<ScreenWithAi/>} />
            <Route path="/AgentStatus" element={<AgentStatus />} />
            <Route path="/ShortListedCandidate" element={<Shortlidted />} />
            <Route path="/Interview" element={<Interview />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  )
}


function App(){
  return(
    // provide context here
    <UserProvider>
      <ToggleProvider>
    <BrowserRouter>
          <AppRoutes></AppRoutes>
     </BrowserRouter>
      </ToggleProvider>
    </UserProvider>
  )

}

export default App
