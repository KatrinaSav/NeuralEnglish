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
  const activeWord = useSelector((state) => state.currentArticle.activeWord)
  const articleName = useSelector((state) => state.currentArticle.article.name)

  useEffect(() => {
    fetch(`http://localhost:8000/article/${articleId}/${page}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(articleId, page)
        console.log(json)
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

  return (
    <div className="articleField">
      <h3 className="articleName">{articleName}</h3>
      <div className="textField">{articlePageCount ? textToview : 'HeLLO'}</div>
      <button
        disabled={articlePageCount && page !== 1 ? false : true}
        className="pageBtn"
        onClick={() => {
          dispatch(setCurrentPageAction(page - 1))
        }}
      >
        Previous
      </button>
      <button
        disabled={articlePageCount && page !== articlePageCount ? false : true}
        className="pageBtn"
        onClick={() => {
          dispatch(setCurrentPageAction(page + 1))
        }}
      >
        Next
      </button>
    </div>
  )
}

export default ArticleField
