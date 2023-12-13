import { useDispatch, useSelector } from 'react-redux'
import './QuestionSidePannel.css'
import SideQuestionButton from './SideQuestionButton'

const QuestionSidePannel = () => {
    const articles = useSelector((state) => state.articles.articles)
    const articleId = useSelector((state) => state.questionArticle.article)
    let column = []
    for (let a of articles) {
        column.push(
          <SideQuestionButton article={a} active={a.id === articleId}/>
        )
      }
    return (
    <div className="questionsidePannel">
        <h4 className="yourArticles">Your articles</h4>
        {column}
    </div>
    )
}
export default QuestionSidePannel