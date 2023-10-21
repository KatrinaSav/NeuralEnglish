import './App.css';
import TestingModule from './components/TestingModule';
import AccountModule from './components/AccountModule';
import ReadingModule from './components/ReadingModule';
import { useState } from 'react';

// router add
function App() {
  const [page, setPage] = useState(<AccountModule/>)
  // let page = <AccountModule/>
  return (
    <div className="App">
      <div className='navigationDiv'>
        <h2 className='mainLabel'><span className='redLabel'>Neural</span>English</h2>
        <div>
          <button className='navigationButton' onClick={()=>{setPage(<ReadingModule/>)}}>Reading</button>
          <button className='navigationButton' onClick={()=>{setPage(<TestingModule/>)}}>Tests</button>
          <button className='navigationButton' onClick={()=>{setPage(<AccountModule/>)}}><img className='iconAccount'
           src='https://static-00.iconduck.com/assets.00/profile-circle-icon-512x511-27c2rv9p.png'
           alt='iconAccount'></img>Account</button>
        </div>
      </div>
      <div>
        {page}
      </div>
    </div>
  );
}

export default App;
