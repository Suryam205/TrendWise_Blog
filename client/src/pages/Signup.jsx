import React, { useState } from 'react';
import '../../styles/Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus('Creating account...');

    try {
      const res = await axios.post('http://localhost:4000/api/users/signup', form);

      if (res.status === 201) {
        setStatus('Signup successful!');
        setForm({ name: '', email: '', password: '' });
        navigate('/login');
      } else {
        setStatus('Signup failed');
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2 className="signup-title">Create Your Account</h2>

        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
        </div>

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

        <button type="submit" className="signup-button">Sign Up</button>

        {status && <p className="signup-status">{status}</p>}

        <p className="signup-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
