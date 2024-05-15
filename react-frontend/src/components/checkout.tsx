import React, { useState } from 'react';

function Checkout() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Send the form data to the server
    fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ name, address, card })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Order placed successfully!');
        } else {
          alert('Failed to place order: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  };
  return (
    <div className="container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" className="form-control" required value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="card">Credit Card Number:</label>
          <input type="text" id="card" name="card" className="form-control" required value={card} onChange={e => setCard(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;