import { useState } from 'react';
import { useEffect } from 'react';

const TestingModule = ()=>{ 
    // return <p>TestingModule</p>
const [tasks, setTasks] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8000/articles/1')
      .then((response) => response.json()).catch(console.log("Kek"))
      .then((json) => {
        setTasks(json);
      });
  }, []);
  let result = []
  for (let note in tasks){
    result.push(<a href={tasks[note].Link}>{tasks[note].Name}</a>)
  }
  // let kek = JSON.parse(tasks)
  console.log(typeof tasks)
  console.log(tasks.lenght)
  return result
}

export default TestingModule