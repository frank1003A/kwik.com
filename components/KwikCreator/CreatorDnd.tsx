import React, { FC, useState } from 'react';
import styles from "../../styles/Home.module.css"

interface task {
   id: string, 
   taskName: string,
   type: string, 
   backgroundColor: string
}

const CreatorDnd:FC = () => {
    const [inProgress, setInProgress] = useState<task[]>([])
    const [done, setDone] = useState<task[]>([])

    const tasks: task[] = [
        {id: "1", taskName:"Read book",type:"inProgress", backgroundColor: "red"},
        {id: "2", taskName:"Pay bills", type:"inProgress", backgroundColor:"green"},
        {id: "3", taskName:"Go to the gym", type:"Done", backgroundColor:"blue"},
        {id: "4", taskName:"Play baseball", type:"Done", backgroundColor:"green"}
      ]


    const onDragStart = (event:React.DragEvent<HTMLDivElement>, taskName: string) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}
	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
	    event.preventDefault();
	}

	const onDrop = (event: React.DragEvent<HTMLDivElement>, cat: string) => {
	    let taskName = event.dataTransfer.getData("taskName");

	    let task = tasks.filter((task) => {
	        if (task.taskName == taskName) {
	            task.type = cat;
	        }
	        return task;
	    });
	    setDone((state) => [...state, task[0]]);  
	}

    const disp = [
        <>
        {
        tasks.map(task => {
            return (
                <div key={task.taskName} 
                className={styles["draggable"]}
                draggable
                onDragStart = {(event) => onDragStart(event, task.taskName)}
                style = {{backgroundColor: task.backgroundColor}}>
                {task.taskName}
              </div>
            )
        })
        }
        </>
    ]

	    return (
	      <div className={styles["drag-container"]}>
	        <h2 className={styles["head"]}>To Do List Drag & Drop</h2>
            <div 
            className={styles["inProgress"]}
	    	onDragOver={(event)=> onDragOver(event)}
      		onDrop={(event)=>{ onDrop(event, "inProgress")}}
            >
               {disp}
            </div>	

            <div className={styles["droppable"]}
	        	onDragOver={(event)=>onDragOver(event)}
          		onDrop={(event)=>onDrop(event, "Done")}>
	          {done.map(d => {
                return (
                    <>d.taskName</>
                )
              })}
	        </div>	          
	      </div>
	    );
}

export default CreatorDnd