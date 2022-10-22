import "./task.css";
import { useState } from "react";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import swal from "sweetalert";

function Task({ id, title, description, completed, created }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      // await deleteDoc(taskDocRef);
      swal({
        title: "คุณแน่ใจไหม?",
        text: "เมื่อลบแล้ว คุณจะไม่สามารถกู้คืนไฟล์นี้ได้!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("ไฟล์ของคุณถูกลบไปแล้ว!", {
            icon: "success",
            timer: 1500,
          });
          deleteDoc(taskDocRef);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`task ${checked && "task--borderColor"}`}>
      <div>
        <div className="checkbox-custom">
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />
           <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
        </div>
      </div>
      <div className="task__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <button
              className="task__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="task__deleteButton" onClick={handleDelete}>
              Delete <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>
            View <i class="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>

      {open.view && (
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default Task;
