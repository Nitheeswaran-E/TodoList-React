import React from "react";

const Todo = (props) => {
    const styles = {
        divStyle: {
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems:'center'
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
        <h1 style={ styles.completedStyle }>{props.name}</h1>
        <h3 style={ styles.completedStyle }>{props.desc}</h3>
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