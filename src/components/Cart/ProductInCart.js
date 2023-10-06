import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ProductInCart({key,productId}) {
    //variable product 
    const [product,setProduct]=useState([])
    //variable count that user want to order
    const [count,setCount]=useState(0)
    useEffect(()=>{
        axios.get(`product/${productId}`)
        .then(res=>setProduct(res.data))
        .catch(err => console.log(err))
        setCount(localStorage.getItem(productId))
    },[])

  return (
    <div>
        {console.log(count)}
        {console.log(product)}
    </div>
  )
}
