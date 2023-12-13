import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import './QuestionProgress.css'
import Question from './Question'

const QuestionProgress = () => {
    const questions = useSelector((state) => state.questionArticle.questions)
    const [questionList, setQuestionList] = useState()
    useEffect(() => {
    const questionListResult = []
    console.log(questions.lenght)
    for (let i = 0; i<Object.keys(questions).length; i++){
        // console.log(i)
        questionListResult.push(<Question text={i}/>)
    }
    setQuestionList(questionListResult)
    }, [questions])

    return (
        <div className='questionProgress'>{questionList}</div>
    )
}

export default QuestionProgress