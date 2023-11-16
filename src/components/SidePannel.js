import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './SidePannel.css'
import {
  setCurrentArticleAction,
  setCurrentPageAction,
  setCurrentTextAction,
} from '../store/CurrentArticleReducer'
import { getArticleAction } from '../store/ArticlesReducer'
import ArticleButton from './ArticleButton'

const SidePannel = () => {
  const articles = useSelector((state) => state.articles.articles)
  const currentArticleId = useSelector(
    (state) => state.currentArticle.article.id
  )
  console.log('articles', articles)
  let column = []
  for (let a of articles) {
    column.push(
      <ArticleButton article={a} active={a.id === currentArticleId} />
    )
  }
  return (
    <div className="sidePannel">
      <h4 className="yourArticles">Your articles</h4>
      {column}
    </div>
  )
}

export default SidePannel
