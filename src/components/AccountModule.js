import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AccountModule = () => {
  const dispatch = useDispatch()
  const id = useSelector((state) => state.user.userId)
  console.log(id)
  dispatch({
    type: 'LOGIN',
    id: 29,
  })
  console.log(id)
  return <p>AccountModule:{id}</p>
}

export default AccountModule
