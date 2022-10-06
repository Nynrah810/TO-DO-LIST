import React from "react"

let ToDoItem = (props) => {
    return (
        <div className={'task' + props.isDone}>
            {props.task}
            <p>
                {props.date.slice(0, -8).replace(/-/g, '.').replace('T', ' ')}
            </p>
        </div>
    )
}

export default ToDoItem