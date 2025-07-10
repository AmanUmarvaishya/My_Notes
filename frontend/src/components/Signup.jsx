import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '',email:'' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/signup', form);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Sign Up</button>
      </form>
      <Link className="link-btn" to="/login">Already have an account? Log in</Link>
    </>
  );
}
