import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import './Word.css'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveWordAction } from '../store/CurrentArticleReducer'
import { setWordInfoAction } from '../store/WordInfoReducer'

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
        onClick={() => {
          fetch(`http://localhost:8000/normal/${word}`)
            .then((response) => response.json())
            .then((json) => {
              dispatch(setWordInfoAction(json))
            })
            .catch(console.log('Kek'))
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
