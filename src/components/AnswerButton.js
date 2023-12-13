import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './AnswerButton.css'
import {
    setCurrentQuestionVariantAction,
  } from '../store/CurrentAnswerReducer'

const AnswerButton = ({ text }) => {
  const dispatch = useDispatch()
  const active = useSelector((state) => state.answer.finished)
  const variant = useSelector((state) => state.answer.variant)
  const answer = useSelector((state) => state.answer.answer)
    let squareStyle = 'testSquare'
    let borderStyle = 'AnswerButton'
    if (active){
    if(answer === text){
        squareStyle = 'testSquare correctSquare'
        borderStyle = 'AnswerButton correctAnswer'
    }
    else if (variant === text & variant !== answer){
       squareStyle = 'testSquare wrongSquare'
       borderStyle = 'AnswerButton wrongAnswer'
    }
  }
  // console.log('return')
  return (
    <div className={borderStyle}>
      <div className={squareStyle}></div>
      <button
        className="answerBtn"
        key={text}
        onClick={() => {
            dispatch(setCurrentQuestionVariantAction(text))
        }}
      >
        {text}
      </button>
    </div>
  )
}

export default AnswerButton
