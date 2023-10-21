import { useState } from 'react';
import { useEffect } from 'react';

const TestingModule = ()=>{ 
    return <p>TestingModule</p>
const [tasks, setTasks] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8080/testing')
      .then((response) => response.json()).catch(console.log("Kek"))
      .then((json) => {
        setTasks(json);
      });
  }, []);
return tasks
}

export default TestingModule