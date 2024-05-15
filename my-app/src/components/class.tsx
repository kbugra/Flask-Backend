import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';

type Product = {
    id: number;
    image: string;
    name: string;
    timage: string;
    tname: string;
    price: number;
    age: number;
    time: string;
    capacity: number;
};

const Classes: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { setCartItems, setTotalPrice } = useCart();

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const addToCart = (productId: number, quantity: number) => {
        fetch(`http://localhost:5000/api/add_to_cart/${productId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
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
    
    return (
        <div className="container-xxl py-5">
            <div className="container-fluid">
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
                    <h1 className="mb-3">School Classes</h1>
                    <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                </div>
                <div className="row g-4">
                    {products.map((product) => (
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={product.id}>
                            <div className="classes-item">
                                <div className="d-flex flex-column align-items-center bg-light rounded-circle w-75 mx-auto p-3">
                                    <img className="img-fluid rounded-circle" src={`./static/${product.image}`} alt="" />                                </div>
                                <div className="bg-light rounded p-4 pt-5 mt-n5">
                                    <div className="d-block text-center h3 mt-3 mb-4">{product.name}</div>
                                    <form onSubmit={(e) => { e.preventDefault(); addToCart(product.id, 1); }}>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Buy</button>
                                        </div>
                                    </form>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle flex-shrink-0" src={`./static/${product.timage}`} alt="" style={{ width: '45px', height: '45px' }} />                                            <div className="ms-3">
                                                <h6 className="text-primary mb-1">{product.tname}</h6>
                                                <small>Teacher</small>
                                            </div>
                                        </div>
                                        <span className="bg-primary text-white rounded-pill py-2 px-3">{product.price} $</span>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-4">
                                            <div className="border-top border-3 border-primary pt-2">
                                                <h6 className="text-primary mb-1">Age:</h6>
                                                <small>{product.age}</small>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="border-top border-3 border-success pt-2">
                                                <h6 className="text-success mb-1">Time:</h6>
                                                <small>{product.time}</small>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="border-top border-3 border-warning pt-2">
                                                <h6 className="text-warning mb-1">Capacity:</h6>
                                                <small>{product.capacity}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Classes;