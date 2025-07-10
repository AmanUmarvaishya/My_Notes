import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const token = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const API = 'http://localhost:8080/api/notes';

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setNotes(res.data);
    } catch {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    await axios.post(API, form, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    fetchNotes();
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <h2>Your Notes</h2>
      <form onSubmit={addNote}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
        <button type="submit">Add Note</button>
      </form>
      <div>
        {notes.map(note => (
          <div key={note._id} className="note">
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
      <button className="link-btn" onClick={logout}>Logout</button>
    </>
  );
}
