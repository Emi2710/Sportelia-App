import { useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import Home from './pages/Home'
import ClientLogin from './pages/auth/ClientLogin'
import FranchiseLogin from './pages/auth/FranchiseLogin'
import StructureLogin from './pages/auth/StructureLogin'

import Franchises from './pages/client/franchises/Franchises'

import { useSelector } from 'react-redux'
import Login from './pages/auth/Login'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
}


const App = () => {

  return (
    <BrowserRouter>
      <Routes>


        <Route element={<PrivateRoutes />}>
          <Route path='/' exact element={<Home />} />

          <Route path="/client/franchises" exact element={<Franchises />} />

        </Route>

        <Route element={<RestrictedRoutes />}>

          <Route path='/login' exact element={<Login />} />

          <Route path='/client/login' exact element={<ClientLogin />} />
          <Route path='/franchise/login' exact element={<FranchiseLogin />} />
          <Route path='/structure/login' exact element={<StructureLogin />} />

        </Route>
      </Routes>

    </BrowserRouter>
    
    
  )
}

export default App