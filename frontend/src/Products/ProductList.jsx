import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("You need to be logged in to view products.");
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/', {
                    headers: {
                        'x-api-key': token
                    }
                });
                console.log(response)
                setProducts(response.data.data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch products. Please try again.");
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {error && <p className="error">{error}</p>}
            <div className="product-list">
                {products.map(product => (
                    <div className="product-card" key={product._id}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Company: {product.company}</p>
                        <p>Featured: {product.featured ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
