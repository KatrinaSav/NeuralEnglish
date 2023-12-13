import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import {
    setCurrentQuestionAction,
    setCurrentQuestionsAction,
    clearCurrentQuestionsAction,
    setCurrentQuestionNameAction,
  } from '../store/CurrentQuestionArticleReducer'
import {
    setCurrentQuestionAnswerAction,
    setCurrentQuestionsFinishAction,
    setCurrentAnswersResultAction,
    setCurrentQuestionVariantAction,
    clearCurrentAnswersResultAction,
} from '../store/CurrentAnswerReducer'
import './QuestionField.css'
import AnswerButton from './AnswerButton'

const QuestionField = () => {
    const dispatch = useDispatch()
    const changeCounter = useRef(false);
    const articleName = useSelector((state) => state.questionArticle.name)
    const questionNumber = useSelector((state) => state.questionArticle.question)
    const articleId = useSelector((state) => state.questionArticle.article)
    useEffect(() => {
        console.log('start testing')
        if (changeCounter.current){
        fetch(`http://localhost:8000/testing/${articleId}`)
          .then((response) => response.json())
          .then((json) => {
            // console.log(json)
            dispatch(setCurrentQuestionsAction(json))
          })
          .catch(console.log('Kek'))
        }
          changeCounter.current = true
      }, [articleId])
    const questions = useSelector((state) => state.questionArticle.questions)
    let questionText = ''
    let answers = []
    if (Object. keys(questions). length !== 0){
        const currentQuestion = questions[questionNumber]
        console.log(articleName)
        if(articleName==="Finished!")
          questionText = ('Your score is '+score+' of '+Object. keys(questions). length)
        else
        questionText = currentQuestion.text
        dispatch(setCurrentQuestionAnswerAction(currentQuestion.answer))
        for (let i = 0; i<currentQuestion.questions.length;i++){
            answers.push(
                <AnswerButton text={currentQuestion.questions[i]} />
            )
        }
    }
    
    const answer = useSelector((state) => state.answer.answer)
    const variant = useSelector((state) => state.answer.variant)
    const finished = useSelector((state) => state.answer.finished)
    const score = useSelector((state) => state.answer.answers)
    return (
        <div className="questionField">
      <h3 className="questionName">{articleName}</h3>
      <div style={{ display: questionText ? "block" : "none" }} className="questionText" id='questionText'>{questionText}</div>
      <div className='answers'>{answers}</div>
      <button className='finishBtn'
      onClick={() => {
        if (Object. keys(questions). length===(questionNumber+1)){
          dispatch(setCurrentQuestionAction(0))
          dispatch(clearCurrentQuestionsAction())
          dispatch(setCurrentQuestionNameAction("Finished!"))
          dispatch(clearCurrentAnswersResultAction())
        }
        else
        if (finished) {
            dispatch(setCurrentQuestionAction(questionNumber+1))
            dispatch(setCurrentQuestionsFinishAction(false))
            dispatch(setCurrentQuestionVariantAction(''))
        }
        else
        if (variant === ''){
            alert('Выберите ответ')
        }
        else{
        dispatch(setCurrentQuestionsFinishAction(true))
        const newScore = (answer===variant ? score+1 : score)
        dispatch(setCurrentAnswersResultAction(newScore))
        console.log(score)
        // console.log(variant)
      }
    }
    }
    >{finished ? 'next' : 'answer'}</button>
    </div>
    )

}

export default QuestionField