const initialState = {
    variant: '',
    answer: '',
    finished: false,
    answers: 0,
}

const SET_VARIANT = 'SET_VARIANT'
const SET_ANSWER = 'SET_ANSWER'
const SET_FINISHED = 'SET_FINISHED'
const SET_ANSWERS_RESULTS = 'SET_ANSWERS_RESULTS'
const CLEAR_ANSWERS_RESULTS = 'CLEAR_ANSWERS_RESULTS'

export const CurrentAnswerReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_VARIANT:
          return { ...state, variant: action.variant }
        case SET_ANSWER:
          return { ...state, answer: action.answer }
        case SET_FINISHED:
          return { ...state, finished: action.finished }
        case SET_ANSWERS_RESULTS:
          return { ...state, answers: action.answers }
        case CLEAR_ANSWERS_RESULTS:
          return {...state, answers: 0}
        default:
          return state
      }
}

export const setCurrentQuestionVariantAction = (variant) => ({
    type: SET_VARIANT,
    variant,
})
export const setCurrentQuestionAnswerAction = (answer) => ({
    type: SET_ANSWER,
    answer,
})
export const setCurrentQuestionsFinishAction = (finished) => ({
    type: SET_FINISHED,
    finished,
})
export const setCurrentAnswersResultAction = (answers) => ({
    type: SET_ANSWERS_RESULTS,
    answers,
})
export const clearCurrentAnswersResultAction = () => ({
  type: CLEAR_ANSWERS_RESULTS,
})