import { type } from "@testing-library/user-event/dist/type"

const initialState = {
    article: -1,
    question: 0,
    name: 'Choose the article',
    questions: [],
    answers: [],
}

const SET_QUESTION_ARTICLE = 'SET_QUESTION_ARTICLE'
const SET_QUESTIONS = 'SET_QUESTIONS'
const SET_QUESTION = 'SET_QUESTION'
const SET_ANSWERS = 'SET_ANSWERS'
const SET_NAME = 'SET_NAME'
const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS'
const CLEAR_ANSWERS = 'CLEAR_ANSWERS'

export const CurrentQuestionArticleReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_QUESTION_ARTICLE:
          return { ...state, article: action.article }
        case SET_QUESTIONS:
          return { ...state, questions: action.questions }
        case SET_QUESTION:
          return { ...state, question: action.question }
        case SET_ANSWERS:
          return { ...state, answers: action.answers }
        case SET_NAME:
          return {...state, name: action.name}
        // case CLEAR_ANSWERS:
        //   return {...state, answers: []}
        case CLEAR_QUESTIONS:
          return {...state, questions: []}
        default:
          return state
      }
}
export const setCurrentQuestionArticleAction = (article) => ({
    type: SET_QUESTION_ARTICLE,
    article,
})
export const setCurrentQuestionAction = (question) => ({
    type: SET_QUESTION,
    question,
})
export const setCurrentQuestionsAction = (questions) => ({
    type: SET_QUESTIONS,
    questions,
})
export const setCurrentAnswersAction = (answers) => ({
    type: SET_ANSWERS,
    answers,
})
export const setCurrentQuestionNameAction = (name) => ({
    type: SET_NAME,
    name,
})
export const clearCurrentQuestionsAction = () => ({
  type: CLEAR_QUESTIONS,
})