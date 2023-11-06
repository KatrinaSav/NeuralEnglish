import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import './Word.css'
import { useDispatch } from 'react-redux'
import { setActiveWordAction } from '../store/CurrentArticleReducer'

const Word = ({ word, index, style }) => {
  const dispatch = useDispatch()
  const span = useRef()
  const rect = span.current.getBoundingClientRect()
  console.log(rect)
  let display = 'none'
  if (style === 'activeWord') display = 'inline-block'
  //   const soundButton = (
  //     <button
  //       className="soundBtn"
  //       style={{ left: (rect.right - rect.left) / 2, top: rect.top, display }}
  //     >
  //       Click
  //     </button>
  //   )

  return (
    <>
      {/* {soundButton} */}
      <span
        ref={span}
        onMouseEnter={() => dispatch(setActiveWordAction(index))}
        onMouseLeave={() => dispatch(setActiveWordAction(-1))}
        className={style}
      >
        {word}
      </span>
      <span> </span>
    </>
  )
}

export default Word
