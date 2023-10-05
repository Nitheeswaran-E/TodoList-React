import React,{useState} from "react";

const Todo = (props) => {
    const [isCompleted, setIsCompleted] = useState(false)
    const [isMissed, setIsMissed] = useState(false)
    const styles = {
        
        divStyle: {
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems:'center'
        },
        completedStyle: {
            textDecoration:  isCompleted && 'line-through'
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
              <button style={styles.btns} onClick={() => { setIsCompleted(!isCompleted); props.completedTask(isCompleted?-1:1)}}> {isCompleted?'Not Completed':'Completed'}</button>
      </div>
      <div style={styles.taskInfoDiv}>
        <h1 style={ styles.completedStyle }>{props.name}</h1>
        <h3 style={ styles.completedStyle }>{props.desc}</h3>
      </div>
      <div>
              <button style={styles.btns} onClick={() => { setIsMissed(!isMissed); props.missedTask(isMissed?-1:1)}}> {isMissed?'Not Missed':'Missed'}</button>
      </div>
      <div>
        <button style={styles.btns} onClick={()=>props.removeTask(props.sno)}> Delete</button>
      </div>
    </div>
  );
};

export default Todo;
