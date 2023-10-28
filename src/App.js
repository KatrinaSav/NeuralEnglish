import './App.css'
import TestingModule from './components/TestingModule'
import AccountModule from './components/AccountModule'
import ReadingModule from './components/ReadingModule'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout'

// router add
function App() {
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
