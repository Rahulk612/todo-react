import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

export const Data = ({ data, CompletedHandle }) => {
  return (
    <div className="EachItem">
      <Checkbox onClick={() => CompletedHandle(data)} />
      <div className="titleDesc">
        <p>{data.title}</p>
        <div className="descDiv">
          <p>{data.description}</p>
        </div>
      </div>
      <div className="TimeAndDate">
        <p>{data.dateTime}</p>
        <p>on</p>
        <p>{data.time}</p>
      </div>
      <DeleteIcon className="DeleteIcon" />
    </div>
  );
};
