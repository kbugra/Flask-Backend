import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext, User } from './AuthContext'; // Import the User type

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }

  const { setUser } = authContext;

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/login', { username, password });
    if (response.data.message === "Login successful") {
      // Store the authToken in local storage
      localStorage.setItem('authToken', response.data.authToken);

      const user: User = {
        id: response.data.id, // Add the 'id' property
        email: response.data.email, // Add the 'email' property
        username: response.data.username,
        isAdmin: false, // Set this based on your login logic
      };

      setUser(user);
      navigate('/dashboard');
    }
  } catch (error) {
    setError("Login Unsuccessful. Please check username and password");
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default Login;