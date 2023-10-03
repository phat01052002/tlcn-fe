import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/Search.css'
import ItemSearch from './ItemSearch'
export default function ListSearch({inputSearch}) {
  const [listProduct,setListProduct]=useState([])
  useEffect(()=>{
    if(inputSearch){
      axios.get(`/product/containing/${inputSearch}`)
      .then(res=>setListProduct(res.data))
      .then(error=>console.log(error))
    }
  },[inputSearch])
  if(inputSearch){
    return (
      <div className='list-search'>
         {listProduct.map((product)=>          
          <ItemSearch key={product.productId} productSearch={product}/>
         )}
      </div>
    )
  }
  else{
    return(
      <div></div>
    )
  }
}
