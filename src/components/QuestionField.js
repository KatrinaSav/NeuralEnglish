import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
    setCurrentQuestionAction,
    setCurrentQuestionsAction,
  } from '../store/CurrentQuestionArticleReducer'

const QuestionField = () => {
    const dispatch = useDispatch()
    const articleName = useSelector((state) => state.questionArticle.name)
    const questionNumber = useSelector((state) => state.questionArticle.question)
    const articleId = useSelector((state) => state.questionArticle.article)
    useEffect(() => {
        fetch(`http://localhost:8000/testing/${articleId}`)
          .then((response) => response.json())
          .then((json) => {
            console.log(json)
            dispatch(setCurrentQuestionsAction(json))
          })
          .catch(console.log('Kek'))
      }, [articleId])
    const questions = useSelector((state) => state.questionArticle.questions)
    let questionText = ''
    let answers = []
    if (Object. keys(questions). length !== 0){
        const currentQuestion = questions[questionNumber]
        questionText = currentQuestion.text
        for (let i = 0; i<currentQuestion.questions.length;i++){
            answers.push(
                <button className="answerBtn"
                key={i}
                onClick={() => {
                    dispatch(setCurrentQuestionAction(questionNumber+1))
                    CheckAnswer(currentQuestion.questions[i], currentQuestion.answer, questionNumber)
                }}>
                    {currentQuestion.questions[i]}
                </button>
            )
        }
    }

    return (
        <div className="questionField">
      <h3 className="questionName">{articleName}</h3>
      <div>{questionText}</div>
      <div>{answers}</div>
    </div>
    )

}

const CheckAnswer = (variant, answer, questionNumber) => {
    if (variant === answer){
        return true
    }
    else return false
}
export default QuestionField