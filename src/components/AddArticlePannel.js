import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addArticleAction } from '../store/ArticlesReducer'
import { setCurrentPageAction } from '../store/CurrentArticleReducer'

const AddArticlePannel = () => {
  const dispatch = useDispatch()
  const [url, setUrl] = useState('URL')
  const [title, setTitle] = useState('Title')
  const userId = useSelector((state) => state.user.userId)
  const handleSubmit = function (e) {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url }),
    }
    setUrl('URL')
    setTitle('Title')
    fetch(`http://localhost:8000/article/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        dispatch(
          addArticleAction({
            id: json.id,
            name: json.name,
            pageCount: json.pageCount,
            progress: 1,
          })
        )
        console.log(json)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            autocomplete="off"
            onFocus={() => setTitle('')}
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <input
            autocomplete="off"
            onFocus={() => setUrl('')}
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddArticlePannel
