import "./style.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";
import DialogDetailTask from "../Popup/dialogDetailTask"
export default function SingleCard({
  id,
  name,
  setItems,
  username,
  index,
  moveCardHandler,
  columnsArr,
  deadline,
  Approve
}) {

  // Lấy ngày hiện tại
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const deadlineDate = new Date(deadline);
  

  

  // Kiểm tra deadline và trạng thái cột
  let backgroundColor = "rgba(254,255,83,0.43)";
  if (Approve === "Done") {
    backgroundColor = "#06f60b";

  } if (Approve === "In Progress" && deadline < currentDateString) {
    backgroundColor = "rgba(251,0,61,0.7) ";
  } if (Approve === "In Progress" && deadline > currentDateString) {
    backgroundColor = "rgba(254,255,83,0.43)";
  } if (Approve === "To Do" && deadline < currentDateString) {
    backgroundColor = "rgba(251, 0, 61, 0.7)";
  }


  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, name: name, type: "Card" },
    type: "Card",
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      const listOfColumnNames = columnsArr.map((e) => {
        return e.title;
      });
      const { name } = dropResult || {};
      if (name) {
        if (listOfColumnNames.indexOf(name) > -1) {
          changeItemColumn(item, name);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.3 : 1;

  drag(drop(ref));
  const [openDetailTask, setOpenDetailTask] = useState(false);
  const [keyDetail, setKeyDetail] = useState("");
  const HandleDetailsTask = (id) => {
    setKeyDetail(id)
    console.log(id + " TETS")
    setOpenDetailTask(true);
  }
  return (
    <div ref={ref} style={{
      opacity,
      backgroundColor
    }} className="singleCard"

    >
      <div className="card" onClick={() => HandleDetailsTask(id)}>
        <h4 className="titleCard">{username}</h4>
        <h5 className="User">{name}</h5>
        <h6 className="Deadline">End at {deadline}</h6>
      </div>
      <DialogDetailTask
        open={openDetailTask}
        onClose={() => setOpenDetailTask(false)}
        cardKey={keyDetail}
      />
    </div>

  );
}
