import React, { useEffect, useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [caretaker] = useState(new TodoCaretaker()); 
  const [completed, setCompleted] = useState(3);
  const [missed, setMissed] = useState(1);
  const [sno, setSno] = useState(4)
  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [totalTasks, setTotalTasks] = useState(0)
  const [todos, setTodos] = useState(
    [
      {
        sno: 1,
        name: "Full stack Lab",
        desc: "Need to Complete ex-7,8",
        isCompleted:false,
        isMissed:false
      },
      {
        sno: 2,
        name: "Deep Learning Lab",
        desc: "Need to Complete ex-4,5,6",
        isCompleted:false,
        isMissed:false
      },
      {
        sno: 3,
        name: "POSE Lab",
        desc: "Need to Complete Reveiew-2",
        isCompleted:false,
        isMissed:false
      },
      {
        sno: 4,
        name: "Full stack Lab",
        desc: "Need to Complete ex-7,8",
        isCompleted:true,
        isMissed:false
      },
      {
        sno: 5,
        name: "Deep Learning Lab",
        desc: "Need to Complete ex-4,5,6",
        isCompleted:false,
        isMissed:true
      },
      {
        sno: 6,
        name: "POSE Lab",
        desc: "Need to Complete Reveiew-2",
        isCompleted:false,
        isMissed:false
      },
    ]
  )
  const [backUp,] = useState(todos)
  useEffect(() => { 
    setTotalTasks(todos.length)
    caretaker.addMemento(new TodoMemento(todos));
  },[])
  
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    addTaskBtn: {
      padding: "10px 30px",
    },
    div: {
      display: 'flex',
      gap:'20px'
    }
  };
  const compeleteTask = (sno) =>{
    const updatedTodos = todos.map((todo) =>
        todo.sno === sno ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos)
    caretaker.addMemento(new TodoMemento(updatedTodos));
    console.log(caretaker.getMemento())
    let count = todos.map(todo => todo.sno === sno ? todo.isCompleted : null )[0]
    console.log(count)
    count = count?-1:1
    console.log(count)
    setCompleted(completed + count)
    setTotalTasks(totalTasks-count)
}
const missTask = (sno) =>{
    const updatedTodos = todos.map((todo) =>
        todo.sno === sno ? { ...todo, isMissed: !todo.isMissed } : todo
    );
    setTodos(updatedTodos)
    caretaker.addMemento(new TodoMemento(updatedTodos));
    console.log(caretaker.getMemento())
    let count = todos.map(todo => todo.sno === sno ? todo.isMissed : null )[0]
    console.log(count)
    count = count?-1:1
    console.log(count)
    setMissed(missed + count)
    setTotalTasks(totalTasks-count)
  }
  const addTask = () => {
    setTodos([...todos,{
      sno: sno,
      name: taskName,
      desc:taskDesc
    }])
    caretaker.addMemento(new TodoMemento([...todos,{
        sno: sno,
        name: taskName,
        desc:taskDesc
    }]));
    setSno(sno+1)
    setTaskName('')
    setTaskDesc('')
    setTotalTasks(totalTasks+1)
  }
  const removeTask = (sno) => {
    setTodos(todos.filter(todo=>todo.sno!==sno))
    caretaker.addMemento(new TodoMemento(todos.filter(todo=>todo.sno!==sno)));
  }
  const sortByCompleted = (sno) => {
    setTodos(todos.filter(todo=>todo.isCompleted===true))
    caretaker.addMemento(new TodoMemento(todos.filter(todo=>todo.isCompleted===true)));
  }
  const sortByMissed = (sno) => {
    setTodos(todos.filter(todo=>todo.isMissed===true))
    caretaker.addMemento(new TodoMemento(todos.filter(todo=>todo.isMissed===true)));
  }
  const reset = () => { 
    setTodos(backUp)
    caretaker.addMemento(new TodoMemento(backUp));
  }
  const undo = () => {
    const memento = caretaker.undo()
    console.log('undo',memento.getState())
    if (memento) {
        setTodos(memento.getState());
    }
  }
  const redo = () => {
    const memento = caretaker.redo();
    console.log('redo',memento.getState())
    if (memento) {
      setTodos(memento.getState());
    }
  };
  return (
    <div>
      <div style={styles.navbar}>
        <h2>Todo App</h2>
        <h3>Tasks Remaining: { totalTasks }</h3>
        <h3>Total Completed Tasks: {completed}</h3>
        <h3> Total Missed Tasks: {missed}</h3>
        <div style={styles.div}>
          <button style={styles.addTaskBtn} onClick={addTask}>Add Task+</button>
          <input onChange={(e)=>setTaskName(e.target.value)} type="text" placeholder="Enter task name" />
          <input onChange={(e)=>setTaskDesc(e.target.value)} type="textarea" placeholder="Enter task description" />
        </div>
      </div>
      {todos.map((task) => ( 
        <Todo
          sno={task.sno}
          name={task.name}
          desc={task.desc} 
          isMissed={task.isMissed}
          isCompleted={task.isCompleted}
          removeTask={removeTask}
          completeTask={compeleteTask}
          missTask={missTask}
        />
      ))}
      <button onClick={sortByCompleted}>Completed</button>
      <button onClick={sortByMissed}>Missed</button>
      <button onClick={reset}>Reset</button>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
    </div>
  );
};
// Memento class
class TodoMemento {
    constructor(state) {
      this.state = state;
    }
    getState() {
      return this.state;
    }
  }
// Caretaker class
class TodoCaretaker {
    constructor() {
      this.mementos = [];
      this.currentIndex = -1;
    }
    getMemento(){
        return this.mementos[this.mementos.length - 1]
    }
    addMemento(memento) {
      this.mementos.push(memento);
      this.currentIndex = this.mementos.length - 1;
    }
    undo() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        return this.mementos[this.currentIndex];
      }
      return null;
    }
    redo() {
      if (this.currentIndex < this.mementos.length - 1) {
        this.currentIndex++;
        return this.mementos[this.currentIndex];
      }
      return null;
    }
  }
export default TodoList;