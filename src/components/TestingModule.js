import { useState } from 'react'
import { useEffect } from 'react'
import './TestingModule.css'
import QuestionSidePannel from './QuestionSidePannel'
import QuestionField from './QuestionField'
import QuestionProgress from './QuestionProgress'

const TestingModule = () => {
  return <div>
  <div className="testingPage">
    <div className="testingSide">
      <QuestionSidePannel />
    </div>
    <div className='test'>
      <QuestionField />
    </div>
    <div className='progress'>
      <QuestionProgress />
    </div>
  </div>
</div>
}

export default TestingModule
