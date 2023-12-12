import { useState } from 'react'
import { useEffect } from 'react'
import QuestionSidePannel from './QuestionSidePannel'
import QuestionField from './QuestionField'
import QuestionProgress from './QuestionProgress'

const TestingModule = () => {
  return <div>
  <div className="readingPage">
    <div className="questionSide">
      <QuestionSidePannel />
    </div>
    <div>
      <QuestionField />
    </div>
    <div>
      <QuestionProgress />
    </div>
  </div>
</div>
}

export default TestingModule
