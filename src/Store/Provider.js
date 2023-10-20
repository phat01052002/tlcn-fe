import React, { useReducer } from 'react'
import Context from './Context'
import Reducer, { initState } from './Reducer'

export default function Provider({children}) {
    const [numberCartState , dispatch] = useReducer(Reducer,initState)
  return (
    <Context.Provider value={[numberCartState , dispatch]}>
        {children}
    </Context.Provider>
  )
}
