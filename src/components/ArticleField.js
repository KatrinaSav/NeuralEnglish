import React from 'react'
import Word from './Word'
import './ArticleField.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  setCurrentPageAction,
  setCurrentTextAction,
} from '../store/CurrentArticleReducer'

const ArticleField = () => {
  const dispatch = useDispatch()
  const articleId = useSelector((state) => state.currentArticle.article.id)
  const articlePageCount = useSelector(
    (state) => state.currentArticle.article.pageCount
  )
  const page = useSelector((state) => state.currentArticle.page)
  const text = useSelector((state) => state.currentArticle.text)
  const activeWord = useSelector(
    (state) => state.currentArticle.activeWord.index
  )

  useEffect(() => {
    fetch(`http://localhost:8000/article/${articleId}/${page}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setCurrentTextAction(json['0'].text))
      })
      .catch(console.log('Kek'))
  }, [articleId, page])

  let words = text.split(' ')

  let textToview = words.map((element, index) => {
    let style = 'word'
    if (index === activeWord) style = 'activeWord'
    return <Word word={element} index={index} style={style} />
  })
  console.log(words, textToview)
  return (
    <div className="articleField">
      <div className="textField">{textToview}</div>
      <button
        className="btnPrev"
        onClick={() => {
          if (page !== 1) dispatch(setCurrentPageAction(page - 1))
        }}
      >
        Previous
      </button>
      <button
        className="btnNext"
        onClick={() => {
          if (page !== articlePageCount)
            dispatch(setCurrentPageAction(page + 1))
        }}
      >
        Next
      </button>
    </div>
  )
}

export default ArticleField
