import { useDispatch, useSelector } from 'react-redux'
import './QuestionSidePannel.css'
import {
    setCurrentQuestionArticleAction,
    setCurrentQuestionAction,
    setCurrentAnswersAction,
    setCurrentQuestionsAction,
    setCurrentQuestionNameAction,
  } from '../store/CurrentQuestionArticleReducer'
  import { getArticleAction } from '../store/ArticlesReducer'

const QuestionSidePannel = () => {

    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles.articles)
    let column = []
    for (let a of articles) {
        column.push(
          <button
            className="articleQuestionBtn"
            key={a.id}
            onClick={() => {
              dispatch(setCurrentQuestionNameAction(a.name))
              dispatch(setCurrentQuestionArticleAction(a.id))
            }}
          >
            {a.name}
          </button>
        )
      }
    return (
    <div className="QuestionsidePannel">
        <h4>Your articles</h4>
        {column}
    </div>
    )
}
export default QuestionSidePannel