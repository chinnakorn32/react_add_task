import Modal from "./Modal";
import { useState } from "react";
import "./addTask.css";
import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(
        collection(db, "tasks"),
        {
          title: title,
          description: description,
          completed: false,
          created: Timestamp.now(),
        },
      );
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="📌 เพิ่มงาน" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="📄 ชื่อหัวข้อ"
        />

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="📝 ป้อนคำอธิบายงาน"
          value={description}
        ></textarea>
        <button type="submit">
          บันทึก <i class="fa-solid fa-floppy-disk"></i>
        </button>
      </form>
    </Modal>
  );
}

export default AddTask;
