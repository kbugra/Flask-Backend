import React from 'react';

interface User {
  username: string;
  email: string;
  id: string;
}

interface Product {
  name: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
}

interface AdminDashboardProps {
  users: User[];
  orders: Order[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, orders }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Users</h2>
        {Array.isArray(users) && users.map(user => (
          <div key={user.id}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Removed display of hashed password */}
            {/* Implement delete user functionality */}
          </div>
        ))}
      </div>
      <div>
        <h2>Orders</h2>
        {Array.isArray(orders) && orders.map(order => (
          <div key={order.id}>
            <h3><strong>Order ID:</strong> {order.id}</h3>
            <p><strong>Username:</strong> {order.user.username}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {Array.isArray(order.items) && order.items.map((item, index) => (
                <li key={index}>
                  <p><strong>Product Name:</strong> {item.product.name}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;