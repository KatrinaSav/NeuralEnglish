import React from 'react'
import { useSelector } from 'react-redux'
import './Question.css'

const Question = ({ text }) => {
    const currentNum = useSelector((state) => state.questionArticle.question)
    return (<div className="question">
    <div className={text===currentNum ? 'questionSquare current' : 'questionSquare'}></div>
    <p2
      className="questionCpt"
      key={text}
    >
      {'Question '+(text+1)}
    </p2>
  </div>)
}

export default Question