import axios from 'axios';
import React, { useEffect } from 'react'
import HomePage from '../components/HomePage/HomePage';

export default function PageUser() {
  //check authenticate
  const checkUser = async ()=>{
    try{
      const accessToken=JSON.parse(sessionStorage.getItem('USER')).token
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/user/check',
        headers: { 
          'Authorization': `Bearer ${accessToken}`
        }
      };

      const request = await axios.request(config)
    }catch{
        sessionStorage.removeItem("USER")
        window.location="/login"
    }  
  }
  useEffect(()=>{
    checkUser()
  },[])
  ////////////////
  return (
    <div>
        <HomePage role={"user"}/>
    </div>
  )
}
