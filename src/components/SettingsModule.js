import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './SettingsModule.css';

const SettingsModule = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.userId);

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/setting/${id}`);
        const json = await response.json();

        setName(json.userName);
        setPass(json.userPass);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
}, [id]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(pass);
    try {
        // Отправляем данные на сервер для обновления
        fetch(`http://localhost:8000/updateUserData/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'name':name, 'password':pass }),
        }).then((response) => response.json())
        .then((json) => {
            console.log(json)
    
            if (json['success']) {
    
              setStatus('*Data updated successfully');
            } else {
              setStatus('*Failed to update data');
            }
          
        })
        
        
      } catch (error) {
        console.error('*Error updating data:', error);
        setStatus('*Error updating data');
      }


  };

  return (
    <section className="settingsForm">
      <h2 className="settingsTitleH2">Settings</h2>
      <form className="settingsInputForm" onSubmit={handleSubmit}>
        <label className="settingsFormLabel" htmlFor="name">
          Name
        </label>
        <input
          className="settingsFormInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" 
          placeholder={name}
          id="name"
          name="name"
        />
        <label className="settingsFormLabel" htmlFor="password">
          Password
        </label>
        <input
          className="settingsFormInput"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder={pass}
          id="password"
          name="password"
        />
        <button className="settingsFormButton" type="submit">
          Change
        </button>
        <label style={{ textAlign: 'center',  fontFamily: 'Livvic'}}>{status}</label>
      </form>
    </section>
  );
};

export default SettingsModule;
