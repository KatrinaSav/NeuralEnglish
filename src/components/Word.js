import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import './Word.css'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveWordAction } from '../store/CurrentArticleReducer'
import SoundButton from './SoundButton'

const Word = ({ word, index, style }) => {
  const dispatch = useDispatch()
  let ref = useRef()
  const [sound, setSound] = useState()

  let soundBtn
  useEffect(() => {
    const rect = ref.current.getBoundingClientRect()
    soundBtn = (
      <button
        className="soundBtn"
        style={{
          left: rect.left,
          top: rect.top - rect.height + 28,
        }}
        onClick={() => console.log('click')}
      >
        Click
      </button>
    )
    setSound(soundBtn)
  }, [])
  let btn = useSelector((state) => state.currentArticle.activeWord.button)
  console.log(btn)

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={() => {
          dispatch(setActiveWordAction({ index: index, button: sound }))
        }}
        onMouseLeave={() =>
          dispatch(setActiveWordAction({ index: -1, button: null }))
        }
        className={style}
      >
        {word}
      </span>
      <span> </span>
      {style === 'activeWord' ? btn : null}
    </>
  )
}

export default Word
