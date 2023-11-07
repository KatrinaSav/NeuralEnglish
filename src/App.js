import './App.css'
import TestingModule from './components/TestingModule'
import AccountModule from './components/AccountModule'
import ReadingModule from './components/ReadingModule'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout'
import { useEffect } from 'react'
import { addArticleAction } from './store/ArticlesReducer'

function App() {
  // articles.forEach((element) => {

  // })
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<AccountModule />}></Route>
        <Route path="reading" element={<ReadingModule />}></Route>
        <Route path="testing" element={<TestingModule />}></Route>
      </Route>
    </Routes>
  )
}

export default App
