import React from 'react'
import Word from './Word'
import './ArticleField.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  setCurrentPageAction,
  setCurrentTextAction,
} from '../store/CurrentArticleReducer'
import { updateArticleProgressAction } from '../store/ArticlesReducer'

const ArticleField = () => {
  const dispatch = useDispatch()
  const articleId = useSelector((state) => state.currentArticle.article.id)
  const articlePageCount = useSelector(
    (state) => state.currentArticle.article.pageCount
  )
  const page = useSelector((state) => state.currentArticle.page)
  const text = useSelector((state) => state.currentArticle.text)
  const activeWord = useSelector((state) => state.currentArticle.activeWord)
  const articleName = useSelector((state) => state.currentArticle.article.name)

  let words = text.split(' ')
  let textToview = words.map((element, index) => {
    let style = 'word'
    if (index === activeWord) style = 'activeWord'
    return <Word word={element} index={index} style={style} />
  })

  return (
    <div className="articleField">
      <h3 className="articleName">{articleName}</h3>
      <div className="textField">{articlePageCount ? textToview : 'HeLLO'}</div>
      <div className="pageButtons">
        <button
          disabled={articlePageCount && page !== 1 ? false : true}
          className="pageBtn"
          onClick={() => {
            const newPage = page - 1
            dispatch(setCurrentPageAction(newPage))
            dispatch(updateArticleProgressAction(newPage, articleId))
          }}
        >
          Previous
        </button>
        <button
          disabled={
            articlePageCount && page !== articlePageCount ? false : true
          }
          className="pageBtn"
          onClick={() => {
            const newPage = page + 1
            dispatch(setCurrentPageAction(newPage))
            dispatch(updateArticleProgressAction(newPage, articleId))
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ArticleField
