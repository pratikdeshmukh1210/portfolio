import React from 'react'
import { useState } from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const Authlayout = () => {

    const [toggle , setToggle] = useState(true) ;
  return (
    <div>{toggle?<Login setToggle={setToggle}/>:<Register setToggle ={setToggle} />}</div>
  )
}

export default Authlayout ;