import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import axios from "axios"
import { TodoList } from "./Todos"

export const TodoInput = () => {
  const [todoData, setData] = useState([]);
  const [completed,setCompleted] = useState([]);
  const [incompleted,setIncompleted] = useState([])
  const [showData,setShowData] = useState([])
  const [title,setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [dateTime, setTime] = useState(new Date());


  const handleClick = () => {
    console.log(dateTime)
    var month = dateTime.getUTCMonth() + 1; 
    var day = dateTime.getUTCDate();
    var year = dateTime.getUTCFullYear();
    var hour = dateTime.getHours()
    var minute = dateTime.getMinutes()

    const newdate = year + "/" + month + "/" + day;
    const time = hour+":"+minute;
    console.log(time)
    const obj = {
      title,
      description,
      dateTime:newdate,
      time,
    };
    axios
      .post("https://fast-oasis-38540.herokuapp.com/data", obj)
      .then(TodoHandle)
      .catch((err) => console.log(err));
  }


  useEffect(() => {
    TodoHandle();
  }, []);

  useEffect(() => {}, [todoData]);

  const TodoHandle = () => {
    axios
      .get("https://fast-oasis-38540.herokuapp.com/data")
      .then((data) => {
        setShowData(data.data)
        setData(data.data) 
        setIncompleted(data.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    console.log(completed)
  },[completed])

  const CompletedHandle = (item) => {
      setData(todoData.filter((e) => {
        return e.id != item.id;
      }));
      setIncompleted(
        incompleted.filter((e) => {
          return e.id != item.id;
        })
      );
      setCompleted([...completed,item])
  }


  const ShowHandle = (text) => {
    if(text[0]=="C") setShowData(completed)
    else if(text[0]=="I") setShowData(incompleted)
    else setShowData(todoData)
  }

  return (
    <div className="pageBackground">
      <Card className="MUIDiv" variant="outlined">
        <h1>Todo by react</h1>
        <FormControl className="FormDiv" sx={{ width: "80%" }}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            helperText=" "
            id="demo-helper-text-aligned"
            label="title"
          />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            helperText=" "
            id="demo-helper-text-aligned"
            label="description"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Choose Date & Time"
              value={dateTime}
              onChange={(newValue) => {
                setTime(newValue);
              }}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={handleClick}>
            Add Todo
          </Button>
        </FormControl>
      </Card>
      <div className="listDiv">
        <TodoList
          todoData={showData}
          CompletedHandle={CompletedHandle}
          ShowHandle={ShowHandle}
        />
      </div>
    </div>
  );
};
