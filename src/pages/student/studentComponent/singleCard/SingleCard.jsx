import "./style.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";
import DialogDetailTask from "../Popup/dialogDetailTask"
export default function SingleCard({
  name,
  setItems,
  username,
  index,
  moveCardHandler,
  columnsArr
}) {
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
  const HandleDetailsTask = () => {
    setOpenDetailTask(true);
  }
  return (
    <div ref={ref} style={{ opacity }} className="singleCard">
      <div className="card" onClick={HandleDetailsTask}>
        <h4 className="titleCard">{name}</h4>
        <h5 className="User">{username}</h5>
      </div>
      <DialogDetailTask
        open={openDetailTask}
        onClose={() => setOpenDetailTask(false)}
      />
    </div>
  );
}
