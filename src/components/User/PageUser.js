import axios from 'axios';
import React, { useEffect } from 'react'

export default function PageUser() {
  //check authenticate
  const checkUser = async ()=>{
    const accessToken=JSON.parse(sessionStorage.getItem('USER')).token
    try{
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/user/check',
        headers: { 
          'Authorization': `Bearer ${accessToken}`
        }
      };

      const request =await axios.request(config)
    }catch{
        window.location="/login"
    }  
  }
  useEffect(()=>{
    checkUser()
  },[])
  ////////////////
  return (
    <div>
        page user
    </div>
  )
}
