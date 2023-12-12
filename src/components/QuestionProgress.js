import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const QuestionProgress = () => {
    const questions = useSelector((state) => state.questionArticle.questions)
    const questionList = []
    for (let i = 0; i<questions.lenght; i++){
        questionList.push("Question "+i)
    }
    return (
        <div>{questionList}</div>
    )
}

export default QuestionProgress