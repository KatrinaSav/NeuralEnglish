import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import './Word.css'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveWordAction } from '../store/CurrentArticleReducer'

const Word = ({ word, index, style }) => {
  const dispatch = useDispatch()

  return (
    <>
      <span
        onMouseEnter={() => {
          dispatch(setActiveWordAction(index))
        }}
        onMouseLeave={() => {
          dispatch(setActiveWordAction(-1))
        }}
        className={style}
      >
        {word}
      </span>
      <span> </span>
    </>
  )
}

export default Word
