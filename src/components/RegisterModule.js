import { useDispatch} from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginModule.css'

const RegisterModule = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [status, setStatus] = useState('')


    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(name)
      console.log(pass)
      fetch(`http://localhost:8000/register/${name}/${pass}`)
      .then((response) => response.json())
      .then((json) => {
        if (json['userId'] != null){
          setStatus('Account successfully created')
        }
        else{
          // показать варминг
          setStatus('*This login or password is already in use')
          setName("")
          setPass("")
        }
      })
    }

    return (
      <section className='allForm'>
        <h2 className='titleH2'>Register</h2>
        <form className="inputForm"onSubmit={handleSubmit}> 
          <label className="formLabel"htmlFor="name">Name</label>
          <input className="formInput"value={name} onChange={(e) => setName(e.target.value)}type='name' placeholder='Alice' id="name" name="name"/>
          <label className="formLabel"htmlFor="password">Password</label>
          <input className="formInput"value={pass} onChange={(e) => setPass(e.target.value)}type='password' placeholder='*********' id="password" name="password"/>
          <button className="formButton"type="submit">Register</button>
          <label style={{textAlign: 'center',  fontFamily: 'Livvic'}}>{status}</label>
        </form>
        <Link style={{fontSize: '20px'}}className="navLink" to='..'>Already have an account? Login here</Link>
      </section>
    )
  }

export default RegisterModule