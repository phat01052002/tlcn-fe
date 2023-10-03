import React, { useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import './css/Category.css'
export default function Category({key,category}) {
  const navigate = useNavigate();

  //navigate to category page with Id
  const handleClickCategory=useCallback((e)=>{  
    var nav=`/category/${category.categoryId}`
    navigate(nav)
    window.location.reload()
  },[])
  return (
    <div className='category' onClick={handleClickCategory}>
        {category.name}
    </div>
  )
}

