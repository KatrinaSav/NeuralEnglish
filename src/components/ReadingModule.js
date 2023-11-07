import { useDispatch, useSelector } from 'react-redux'
import './ReadingModule.css'
import SidePannel from './SidePannel'
import ArticleField from './ArticleField'
import { getArticleAction } from '../store/ArticlesReducer'
import { useEffect } from 'react'
import InfoPannel from './InfoPannel'

const ReadingModule = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userId)
  useEffect(() => {
    dispatch(getArticleAction(user))
  }, [])

  return (
    <div>
      <div className="readingPage">
        <div className="side">
          <SidePannel />
        </div>
        <div className="article">
          <ArticleField />
        </div>
        <div className="tools">
          <InfoPannel />
        </div>
      </div>
    </div>
  )
}

export default ReadingModule
