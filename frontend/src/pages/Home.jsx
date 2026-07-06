import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/NoteStyles.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
      console.log(res);
    } catch (error) {
      alert(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        alert("Note deleted");
      } else {
        alert("Failed to delete note");
      }
    } catch (error) {
      alert(error);
    }

    getNotes();
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", { title, content });
      if (res.status === 201) {
        alert("Note created");
        setTitle("");
        setContent("");
        getNotes();
      } else {
        alert("Failed to create note");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
            <div>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
            </div>
        )}
      </div>

      <div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <br />
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          ></textarea>
          <br />
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  );
}
