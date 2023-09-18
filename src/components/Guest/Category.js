import React from 'react'
import './css/Category.css'
export default function Category({key,category}) {
  return (
    <div className='category'>
        {category.name}
    </div>
  )
}

