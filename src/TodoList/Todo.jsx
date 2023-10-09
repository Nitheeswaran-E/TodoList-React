import React from "react";

const Todo = (props) => {
    const styles = {
        divStyle: {
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems:'center',
            fontSize: '10px'
        },
        completedStyle: {
            textDecoration:  props.isCompleted && 'line-through'
        },
        taskInfoDiv: {
            textAlign:'left'
        },
        btns: {
            padding:'10px 30px'
        }
    }
  return (
    <div style={ styles.divStyle }>
      <div>
        <p>{ props.sno }</p>
      </div>
      <div>
        <button style={styles.btns} onClick={() => { props.completeTask(props.sno)}}> {props.isCompleted?'Not Completed':'Completed'}</button>
      </div>
      <div style={styles.taskInfoDiv}>
      <table>
          <tr>
            <td>
            <h1 style={ styles.completedStyle }>Task Name:</h1>
            </td>
            <td>
             <h1 style={ styles.completedStyle }> {props.name}</h1>
            </td>
          </tr>
        </table>
        <h1 style={ styles.completedStyle }>Task Name: {props.name}</h1>
        <h3 style={ styles.completedStyle }>Description: {props.desc}</h3>
        <h3 style={styles.completedStyle }>Tags: {props.tag}</h3>
  
        <p  style={styles.completedStyle}>Due date: {props.dueDate}</p>
      </div>
      <div>
        <button style={styles.btns} onClick={() => { props.missTask(props.sno)}}> {props.isMissed?'Not Missed':'Missed'}</button>
      </div>
      <div>
        <button style={styles.btns} onClick={()=>props.removeTask(props.sno)}> Delete</button>
      </div>
    </div>
  );
};

export default Todo;