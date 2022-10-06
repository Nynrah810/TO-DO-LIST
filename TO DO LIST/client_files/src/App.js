import axios from 'axios';
import React from 'react';
import ToDoItem from './component/ToDoItem';

function App() {

  let [todo, setToDo] = React.useState([])

  React.useEffect(() => {
    let data = axios.get('http://localhost:8080')
    data.then(res => {
      setToDo(res.data)
    })
  }, [])
  
  let inputText = React.createRef(),
    inputDate = React.createRef()

  const addTask = () => {
    axios.post('http://localhost:8080', {
      id: null,
      task: inputText.current.value,
      date: inputDate.current.value,
      isDone: 0,
      operation: 'add'
    })
    window.location.reload()
  }

  const deleteTask = event => {
    axios.post('http://localhost:8080', {
      id: event.currentTarget.id,
      operation: 'delete'
    })
    window.location.reload()
  }

  const isDone = event => {
    axios.post('http://localhost:8080', {
      id: event.currentTarget.id,
      isDone: event.currentTarget.checked,
      operation: 'isDone'
    })
    window.location.reload()
  }

  return (
    <div className='site_wrapper'>
      <header className='header'>
        <div className='header_inner'>
          <h1>TO DO LIST</h1>
          <div className='addtask_wrapper'>
            <input ref={inputText} placeholder='Напишите задачу'/>
            <input ref={inputDate} type='datetime-local'/>
            <button onClick={addTask}>Добавить</button>
          </div>
        </div>
      </header>
      <div className='list'>
        {
          todo.map(el => {
            return (
              <div className="ToDoItem"><div className='check_n_task'><input id={el.id} type='checkbox' onClick={isDone} checked={el.isDone} /><ToDoItem isDone={el.isDone} task={el.task} date={el.date} /></div><button id={el.id} onClick={deleteTask}>Удалить</button></div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
