import React from 'react'
import Layout from '../../components/Layout'
import Franchises from './franchises/Franchises'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'


const Client = () => {
  return (
    <Layout>
        <Routes>
          <Route path="/client/franchises" exact element={<Franchises />} />
        </Routes>
    </Layout>
  )
}

export default Client