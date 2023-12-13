import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './SideQuestionButton.css'
import {
    setCurrentQuestionArticleAction,
    setCurrentQuestionNameAction,
  } from '../store/CurrentQuestionArticleReducer'

const SideQuestionButton = ({ article, active }) => {
  const dispatch = useDispatch()
  return (
    <div className="ArticleButton">
      <div className={active ? 'square activeSquare' : 'square'}></div>
      <button
        className="articleSide"
        key={article.id}
        onClick={() => {
            dispatch(setCurrentQuestionNameAction(article.name))
            dispatch(setCurrentQuestionArticleAction(article.id))
        }}
      >
        {article.name}
      </button>
    </div>
  )
}

export default SideQuestionButton
