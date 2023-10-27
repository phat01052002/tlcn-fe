import React, { useCallback } from 'react'

export default function CategoryHomePage({category}) {
    const handleClick = useCallback(()=>{
        window.location = `/category/${category.categoryId}`
    },[])
  return (
    <div className='category-homepage' onClick={handleClick}>
        <img src={category.icon}></img>
        <label>{category.name}</label>
    </div>
  )
}
