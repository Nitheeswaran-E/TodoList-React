import React, { useEffect, useState } from "react";
import Todo from "./Todo";

class TodoMemento {
  constructor(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
}
class TodoCaretaker {
  constructor() {
    this.mementos = [];
    this.currentIndex = -1;
  }
  getMemento() {
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
const TodoList = () => {
  const [caretaker] = useState(new TodoCaretaker());
  const [completed, setCompleted] = useState(3);
  const [missed, setMissed] = useState(1);
  const [sno, setSno] = useState(4)
  const [taskName, setTaskName] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [dueDate, setDate] = useState(null)
  const [totalTasks, setTotalTasks] = useState(0)
  const [tag, setTag] = useState('')
  const [todos, setTodos] = useState(
    [
      {
        sno: 1,
        name: "Full stack Lab",
        desc: "Need to Complete ex-7,8",
        isCompleted: false,
        isMissed: false,
        dueDate: new Date("2022-03-25").toISOString().split('T')[0],
        tag: "Full Stack"

      },
      {
        sno: 2,
        name: "Full stack Lab",
        desc: "Need to Complete ex-7,8",
        isCompleted: true,
        isMissed: false,
        dueDate: new Date("2022-03-25").toISOString().split('T')[0],
        tag: "Full Stack"

      },
      {
        sno: 3,
        name: "Deep Learning Lab",
        desc: "Need to Complete ex-4,5,6",
        isCompleted: false,
        isMissed: true,
        dueDate: new Date("2022-03-25").toISOString().split('T')[0],
        tag: "DL"

      }
    ]
  )
  const [backUp,] = useState(todos)
  useEffect(() => {
    setTotalTasks(todos.length)
    caretaker.addMemento(new TodoMemento(todos));
  }, [])

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
      gap: '20px'
    }
  };
  const compeleteTask = (sno) => {
    const updatedTodos = todos.map((todo) =>
      todo.sno === sno ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos)
    caretaker.addMemento(new TodoMemento(updatedTodos));
    console.log(caretaker.getMemento())
    let count = todos.map(todo => todo.sno === sno ? todo.isCompleted : null)[0]
    console.log(count)
    count = count ? -1 : 1
    console.log(count)
    setCompleted(completed + count)
    setTotalTasks(totalTasks - count)
  }
  const missTask = (sno) => {
    const updatedTodos = todos.map((todo) =>
      todo.sno === sno ? { ...todo, isMissed: !todo.isMissed } : todo
    );
    setTodos(updatedTodos)
    caretaker.addMemento(new TodoMemento(updatedTodos));
    console.log(caretaker.getMemento())
    let count = todos.map(todo => todo.sno === sno ? todo.isMissed : null)[0]
    console.log(count)
    count = count ? -1 : 1
    console.log(count)
    setMissed(missed + count)
    setTotalTasks(totalTasks - count)
  }
  const addTask = () => {
    setTodos([...todos, {
      sno: sno,
      name: taskName,
      desc: taskDesc,
      dueDate: dueDate,
      tag: tag
    }])
    caretaker.addMemento(new TodoMemento([...todos, {
      sno: sno,
      name: taskName,
      desc: taskDesc
    }]));
    setSno(sno + 1)
    setTaskName('')
    setTaskDesc('')
    setTotalTasks(totalTasks + 1)
  }
  const removeTask = (sno) => {
    setTodos(todos.filter(todo => todo.sno !== sno))
    caretaker.addMemento(new TodoMemento(todos.filter(todo => todo.sno !== sno)));
  }
  const sortByCompleted = (sno) => {
    setTodos(todos.filter(todo => todo.isCompleted === true))
    caretaker.addMemento(new TodoMemento(todos.filter(todo => todo.isCompleted === true)));
  }
  const sortByMissed = (sno) => {
    setTodos(todos.filter(todo => todo.isMissed === true))
    caretaker.addMemento(new TodoMemento(todos.filter(todo => todo.isMissed === true)));
  }
  const reset = () => {
    setTodos(backUp)
    caretaker.addMemento(new TodoMemento(backUp));
  }
  const undo = () => {
    const memento = caretaker.undo()
    console.log('undo', memento.getState())
    if (memento) {
      setTodos(memento.getState());
    }
  }
  const redo = () => {
    const memento = caretaker.redo();
    console.log('redo', memento.getState())
    if (memento) {
      setTodos(memento.getState());
    }
  };
  return (
    <div>
      <div style={styles.navbar}>
        <h2>Todo App</h2>
        <h5>Tasks Remaining: {totalTasks}</h5>
        <h5>Total Completed Tasks: {completed}</h5>
        <h5> Total Missed Tasks: {missed}</h5>
        <div style={styles.div}>
          <button style={styles.addTaskBtn} onClick={addTask}>Add Task+</button>
          <input onChange={(e) => setTaskName(e.target.value)} type="text" placeholder="Enter task name" />
          <input onChange={(e) => setTaskDesc(e.target.value)} type="textarea" placeholder="Enter task description" />
          <input onChange={(e) => setDate(e.target.value)} type="date" placeholder="Enter due date" />
          <input onChange={(e) => setTag(e.target.value)} type="text" placeholder="Enter a Tag" />

        </div>
      </div>
      <div>
        <button onClick={sortByCompleted}>Completed</button>
        <button onClick={sortByMissed}>Missed</button>
        <button onClick={reset}>Reset</button>
        <button onClick={undo}>undo</button>
        <button onClick={redo}>redo</button>

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
          dueDate={task.dueDate}
          tag={task.tag}
        />
      ))}
    </div>
  );
};
export default TodoList;