import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './GoogleLogin';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/notes');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };
   const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="32712112537-1ef5ime2mvpohhrfdp0ar2u0jtskgv18.apps.googleusercontent.com">
        <div className="bgColor">
          <GoogleLogin />
        </div>
      </GoogleOAuthProvider>
    );
  };

  return (
    <>
    <GoogleAuthWrapper/>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      <Link className="link-btn" to="/signup">Don't have an account? Sign up</Link>
    </>
  );
}
