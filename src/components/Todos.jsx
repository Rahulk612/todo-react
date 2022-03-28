import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { Data } from "./Data";



export const TodoList = ({ todoData, CompletedHandle, ShowHandle }) => {
  const [complted, setComplted] = useState("normalClass");
  const [inComplted, setInComplted] = useState("normalClass");
  const [task, setTask] = useState("normalClass");
  //   const [todoData, setData] = useState([]);
  //   useEffect(() => {
  //     TodoHandle()
  //   }, []);

  //   const TodoHandle = () => {
  //     axios
  //       .get("http://localhost:3002/data")
  //       .then((data) => setData(data.data))
  //       .catch((err) => console.log(err));
  //   }

  // const cssHandle = () => {
  //     setStyle("handleChange");
  // }
  useEffect(() => {}, [todoData]);
  return (
    <Card className="todoListDiv">
      <div className="taskComInc">
        <div
          className={task}
          onClick={(e) => {
            ShowHandle(e.target.innerText);
            setTask("tasks");
            setComplted("normalClass");
            setInComplted("normalClass");
          }}
        >
          <h4>Tasks</h4>
        </div>
        <div
          className={complted}
          onClick={(e) => {
            ShowHandle(e.target.innerText);
            setComplted("completed");
            setTask("normalClass");
            setInComplted("normalClass");
          }}
        >
          <h4>Completed</h4>
        </div>
        <div
          className={inComplted}
          onClick={(e) => {
            ShowHandle(e.target.innerText);
            setInComplted("incompleted");
            setComplted("normalClass");
            setTask("normalClass");
          }}
        >
          <h4>Incomepeled</h4>
        </div>
      </div>
      <div className="ScrollDiv">
        <div className="InfoDiv">
          {todoData.map((item) => {
            return (
              <Data
                key={item.id}
                data={item}
                CompletedHandle={CompletedHandle}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
};