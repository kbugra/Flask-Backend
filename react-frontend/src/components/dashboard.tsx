import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext, User } from './AuthContext';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('Dashboard must be used within an AuthProvider');
  }

  const { user: authUser, setUser: setAuthUser } = authContext;

  useEffect(() => {
    if (!authUser || !authUser.username) {
      navigate('/login');
    } else {
      axios.get(`http://localhost:5000/api/dashboard/${authUser.username}`)
        .then(response => {
          if (response.status === 302) {
            navigate('/login');
          } else {
            const updatedUser = {
              id: response.data.id,
              username: response.data.username,
              email: response.data.email,
              isAdmin: response.data.isAdmin,
            };
            setUser(updatedUser);
            setUsername(response.data.username || '');
            setEmail(response.data.email || '');
          }
        });

      axios.get(`http://localhost:5000/user/${authUser.username}/orders`)
        .then(response => {
          setOrders(response.data);
        });
    }
  }, [authUser, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (authUser) {
      axios.post(`http://localhost:5000/api/dashboard/${authUser.username}`, {
        username: username,
        email: email
      })
      .then(response => {
        if (response.data.message) {
          const updatedUser = {
            id: authUser.id,
            username: response.data.username,
            email: response.data.email,
            isAdmin: response.data.isAdmin,
          };
          setUser(updatedUser);
          setAuthUser(updatedUser);
        } else {
          console.error(response.data.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  };
  return (
    <div className="container-xxl-5">
      <h1>Hello, {user && user.username}</h1>

      <div>
        <h2>Update Your Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label><br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email</label><br />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </form>

        <a href="/change-password">Change Password</a>
      </div>

      <div>
        <h2>Your Orders</h2>
        {orders.length > 0 ? orders.map((order: any) => (
          <div key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Date Ordered: {order.date_ordered}</p>
            <ul>
              {order.items.map((item: any) => (
                <li key={item.id}>Product Name: {item.product.name}, Quantity: {item.quantity}</li>
              ))}
            </ul>
          </div>
        )) : <p>You have no orders.</p>}
      </div>
    </div>
  );
} // Add closing parenthesis here

export default Dashboard;