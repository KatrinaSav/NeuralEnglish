import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './ArticleButton.css'
import {
  setCurrentArticleAction,
  setCurrentPageAction,
  setCurrentTextAction,
} from '../store/CurrentArticleReducer'

const ArticleButton = ({ article, active }) => {
  const dispatch = useDispatch()
  return (
    <div className="ArticleButton">
      <div className={active ? 'square activeSquare' : 'square'}></div>
      <button
        className="articleSide"
        key={article.id}
        onClick={() => {
          dispatch(
            setCurrentArticleAction({
              id: article.id,
              name: article.name,
              pageCount: article.pageCount,
            })
          )
          dispatch(setCurrentPageAction(article.progress))

          fetch(
            `http://localhost:8000/article/${article.id}/${article.progress}`
          )
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              dispatch(setCurrentTextAction(json['0'].text))
            })
            .catch(console.log('Kek'))
        }}
      >
        {article.name}
      </button>
      <p className="progress">
        {Math.floor((article.progress / article.pageCount) * 100) + '%'}
      </p>
    </div>
  )
}

export default ArticleButton
