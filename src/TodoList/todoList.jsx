  import React, { useEffect, useState } from "react";
  import Todo from "./Todo";
  const TodoList = () => {
    const [completed, setCompleted] = useState(3);
    const [top,setTop]=useState(0);
    const [missed, setMissed] = useState(1);
    const [sno, setSno] = useState(7)
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
    const [stack,setStack]=useState([{completed:completed,missed:missed,sno:sno,taskName:taskName,totalTasks:totalTasks,taskDesc:taskDesc,todos:todos}]);

    useEffect(() => { setTotalTasks(todos.length)  },[])
    
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
    const addTask = async() => {
        console.log("initial stack");
        console.log(stack);
      setTodos([...todos,{
        sno: sno,
        name: taskName,
        desc:taskDesc
      }])
      setTotalTasks(totalTasks+1)
      setStack([...stack,{completed:completed,missed:missed,sno:sno,taskName:taskName,totalTasks:totalTasks,taskDesc:taskDesc,todos:todos}]);
      setTop(stack.length-1);
      console.log(sno,taskName,taskDesc,todos);
      setSno(sno+1)
      setTaskName('')
      setTaskDesc('')
      
      console.log(stack);
    }
    const removeTask = async(sno) => {
      setTodos(todos.filter(todo=>todo.sno!==sno))
      setStack([...stack,{completed:completed,missed:missed,sno:stack[top].sno,taskName:taskName,totalTasks:totalTasks,taskDesc:taskDesc,todos:todos}]);
      setTop(stack.length-1);
    }
    const sortByCompleted = async() => {
      setTodos(todos.filter(todo=>todo.isCompleted===true))
      setStack([...stack,{completed:completed,missed:missed,sno:sno,taskName:taskName,totalTasks:totalTasks,taskDesc:taskDesc,todos:todos}]);
      setTop(stack.length-1);
    }
    const sortByMissed = async() => {
      setTodos(todos.filter(todo=>todo.isMissed===true))
      setStack([...stack,{completed:completed,missed:missed,sno:sno,taskName:taskName,totalTasks:totalTasks,taskDesc:taskDesc,todos:todos}]);
      setTop(stack.length-1);
    }
    const completedTask = async(count) => {
      setCompleted(completed + count)
      setTotalTasks(totalTasks-count)
      setStack([...stack,{completed:completed,missed:missed,sno:sno,taskName:taskName,totalTasks:totalTasks,taskDesc:taskDesc,todos:todos}]);
      setTop(stack.length-1);
    }
    const missedTask = async(count) => {
      setMissed(missed + count)
      setTotalTasks(totalTasks+count)
      setStack([...stack,{completed:completed,missed:missed,sno:sno,taskName:taskName,totalTasks:totalTasks,taskDesc:taskDesc,todos:todos}]);
      setTop(stack.length-1);
    }
    const undo =async () => {
        if(top==0)
        {
           alert("Cannot Perform Undo Operation");
           return;
        }
        else
        {
            setTop(top-1)
            setSno(stack[top].sno)
            setTaskName(stack[top].taskName)
            setTaskDesc(stack[top].taskDesc)
            setTotalTasks(stack[top].totalTasks)
            setTodos(stack[top].todos)
        }  
      }
      const redo = () => {
        if(top==stack.length-1)
        {
           alert("Cannot Perform redo Operation");
           return;
        }
        else
        {
            setTop(top+1)
            setSno(stack[top].sno)
            setTaskName(stack[top].taskName)
            setTaskDesc(stack[top].taskDesc)
            setTotalTasks(stack[top].totalTasks)
            setTodos(stack[top].todos)
        }  
      }
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
            removeTask={removeTask}
            missedTask={missedTask} 
            completedTask={completedTask}
            sortByMissed={sortByMissed}
            sortByCompleted={sortByCompleted}
          />
        ))}
        <button onClick={sortByCompleted}>Completed</button>
        <button onClick={sortByMissed}>Missed</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>

      </div>
    );
  };

  export default TodoList;