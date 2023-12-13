import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import {
    setCurrentQuestionAction,
    setCurrentQuestionsAction,
    clearCurrentQuestionsAction,
    setCurrentQuestionNameAction,
    setCurrentQuestionArticleAction,
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

function shuffleArray(array) {
  // const newarray = arra
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


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
    const [questionText, setQuestionText] = useState('')
    let answers = []
    const score = useSelector((state) => state.answer.answers)
    if (Object. keys(questions). length !== 0){
        const currentQuestion = questions[questionNumber]
        console.log(articleName)
        // if(articleName==="Finished!")
          // questionText = ('Your score is '+score+' of '+Object. keys(questions). length)
        // else
        // questionText = currentQuestion.text
        
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
    useEffect(()=>{
      if(articleName==="Finished!"){
        console.log('finished!!!!!!!!!!!!')
        setQuestionText('Your score is '+score+' of '+Object. keys(questions). length)
        dispatch(clearCurrentQuestionsAction())
        dispatch(clearCurrentAnswersResultAction())
        console.log(questionText)
        console.log('over useeffect')
      }
    }, [questionNumber, articleId])
    useEffect(() => {
          if (Object. keys(questions). length !== 0){
            setQuestionText(questions[questionNumber].text)
          }
        }, [questions])
    console.log(questionText)
    return (
        <div className="questionField">
      <h3 className="questionName">{articleName}</h3>
      <div style={{ display: questionText ? "block" : "none" }} className="questionText" id='questionText'>{questionText}</div>
      <div className='answers'>{answers}</div>
      <button style={{ display: questionText ? "block" : "none" }} className='finishBtn'
      onClick={() => {
        if (Object. keys(questions). length===(questionNumber+1)&finished){
          dispatch(setCurrentQuestionAction(0))
          dispatch(setCurrentQuestionNameAction("Finished!"))
          dispatch(setCurrentQuestionArticleAction(-1))
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