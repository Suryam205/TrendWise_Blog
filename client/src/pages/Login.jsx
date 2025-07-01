import React, { useState } from 'react';
import '../../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL;


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('Logging in...');

    try {
      const res = await axios.post(
        `${API}/api/users/login`,
        form,
        { withCredentials: true } // Needed to receive/set cookie
      );
   
      if (res.status === 200) {
        setStatus('Login successful!');
        setForm({ email: '', password: '' });
        alert('Login successful!');
        navigate('/');
      } else {
        setStatus('Login failed');
      }
    } catch (err) {
      console.error(err);
      setStatus(
        err.response?.data?.message || 'Login failed. Please check credentials.'
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login to TrendWise</h2>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="login-button">Log In</button>

        {status && <p className="login-status">{status}</p>}

        <p className="login-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
