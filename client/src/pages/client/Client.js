import React from 'react'
import Layout from '../../components/Layout'
import Franchises from './franchises/Franchises'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Dashboard from './franchises/Dashboard'
import Navbar from '../../components/Navbar'


const Client = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

export default Client