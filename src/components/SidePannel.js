import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  setCurrentArticleAction,
  setCurrentPageAction,
  setCurrentTextAction,
} from '../store/CurrentArticleReducer'

const SidePannel = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articles)

  console.log('articles', articles)
  let column = []
  for (let a of articles) {
    column.push(
      <button
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
          console.log('F')
        }}
      >
        {a.name}
      </button>
    )
  }
  return <>{column}</>
}

export default SidePannel
