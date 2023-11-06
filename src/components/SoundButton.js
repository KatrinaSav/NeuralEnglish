import React from 'react'
import { useEffect } from 'react'
import './SoundButton.css'

const SoundButton = ({ ref, display }) => {
  console.log(ref, display)
  //   let rect
  //   useEffect(() => {
  //     rect = ref.current.getBoundingClientRect()
  //   })
  return (
    <button
      className="soundBtn"
      //   style={{ left: (rect.right - rect.left) / 2, top: rect.top, display }}
    >
      Click
    </button>
  )
}

export default SoundButton
