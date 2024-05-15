import React, { useState, useEffect } from 'react';

interface Product {
  name: string;
  price: number;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/cart', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.cart_items) {
          console.log('Cart items from server:', data.cart_items); // Add this line
          setCartItems(data.cart_items);
          setTotalPrice(data.total_price);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const removeFromCart = (cartItemId: number) => {
    fetch(`http://localhost:5000/api/remove_from_cart/${cartItemId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Fetch the updated cart
          fetch('http://localhost:5000/cart', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          })
            .then(response => response.json())
            .then(data => {
              setCartItems(data.cart_items);
              setTotalPrice(data.total_price);
            })
            .catch(error => console.error('Error:', error));
        }
      })
      .catch(error => console.error('Error:', error));
  };
  const checkout = () => {
    fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Clear the cart
          setCartItems([]);
          setTotalPrice(0);
          alert('Checkout successful!');
        } else {
          alert('Checkout failed: ' + data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  };
  return (
    <div className="container">
      <h2>Your Shopping Cart</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {cartItems && cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.product.price}</td>
              <td>{item.quantity * item.product.price}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <h4>Total: {totalPrice}</h4>
        <button onClick={checkout} className="btn btn-primary">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;