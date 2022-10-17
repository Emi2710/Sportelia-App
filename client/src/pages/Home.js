import React from 'react'
import Layout from '../components/Layout'

import Client from './client/Client'
import Franchise from './franchise/Franchise'
import Structure from './structure/Structure'

import secureLocalStorage from  "react-secure-storage";


const Home = () => {
    const role = secureLocalStorage.getItem('role')
  return (
    <div>
        {role==='proprietaire' && <><Client /></>}
        {role==='franchise' && <><Franchise /></>}
        {role==='structure' && <><Structure /></>}
    </div>
  )
}

export default Home