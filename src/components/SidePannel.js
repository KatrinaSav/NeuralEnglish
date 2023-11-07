import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './SidePannel.css'
import {
  setCurrentArticleAction,
  setCurrentPageAction,
  setCurrentTextAction,
} from '../store/CurrentArticleReducer'
import { getArticleAction } from '../store/ArticlesReducer'

const SidePannel = () => {
  const dispatch = useDispatch()

  const articles = useSelector((state) => state.articles.articles)
  console.log('articles', articles)
  let column = []
  for (let a of articles) {
    column.push(
      <button
        className="articleBtn"
        key={a.id}
        onClick={() => {
          dispatch(setCurrentPageAction(a.progress))
          dispatch(
            setCurrentArticleAction({
              id: a.id,
              name: a.name,
              pageCount: a.pageCount,
            })
          )
        }}
      >
        {a.name}
      </button>
    )
  }
  return (
    <div className="sidePannel">
      <h4>Your articles</h4>
      {column}
    </div>
  )
}

export default SidePannel
