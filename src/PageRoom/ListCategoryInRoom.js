import React from 'react'
import Category from '../components/Category/Category'

export default function ListCategoryInRoom({categoriesInRoom,inRoom}) {
  return (
    <div>{categoriesInRoom.map(category=><Category category={category} inRoom={inRoom}/>)}</div>
  )
}
