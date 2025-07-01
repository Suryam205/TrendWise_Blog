import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Navbar.css';

const API = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/api/users/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/api/users/logout`, {}, { withCredentials: true });
      setUser(null);
      alert('Logout successful!');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">TrendWise</Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${isActive('/') ? 'navbar-link-active' : ''}`}
          >
            Home
          </Link>

          <Link
            to={user ? "/create" : "#"}
            className={`navbar-link ${!user ? 'navbar-disabled' : ''}`}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                alert("Please login to create a blog.");
              }
            }}
          >
            Create Blog
          </Link>

          {user ? (
            <button className="navbar-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`navbar-link ${isActive('/login') ? 'navbar-link-active' : ''}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
