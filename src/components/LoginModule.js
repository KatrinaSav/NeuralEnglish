import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setUserId } from '../store/UserReducer.js';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './LoginModule.css'
import { render } from '@testing-library/react';
import { store } from '../store'
import { useNavigate } from 'react-router-dom';



const LoginModule = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [incorrectInput, setIncorrectInput] = useState('')



    const handleSubmit = (e) => {
      e.preventDefault()
      fetch(`http://localhost:8000/login/${name}/${pass}`)
      .then((response) => response.json())
      .then((json) => {
        if (json['userId'] != null){
          dispatch(setUserId(json['userId']))
          // перейти в аккаунт
          navigate('/account');
        }
        else{
          // показать варминг
          setIncorrectInput('*Incorrect data')
          setName("")
          setPass("")
        }
      })


    }

    return (
      <section className='allForm'>
        <h2 className='titleH2'>Login</h2>
        <form className="inputForm"onSubmit={handleSubmit}> 
          <label className="formLabel"htmlFor="name">Name</label>
          <input className="formInput"value={name} onChange={(e) => setName(e.target.value)}type='name' placeholder='Alice' id="name" name="name"/>
          <label className="formLabel"htmlFor="password">Password</label>
          <input className="formInput"value={pass} onChange={(e) => setPass(e.target.value)}type='password' placeholder='*********' id="password" name="password"/>
          <button className="formButton"type="submit">Log In</button>
          <label style={{textAlign: 'center'}}>{incorrectInput}</label>
        </form>
        <Link style={{fontSize: '20px'}} className="navLink" to={'register'}>Don't have an account? Register here</Link>
      </section>
    )
  }
  
  export default LoginModule