import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiServices";
import '../../styles/ProductDetailsPage.css';
import { FaStar, FaStarHalfAlt, FaRegStar, FaCartPlus } from "react-icons/fa";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { cart, dispatch } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await ApiService.getProductById(productId);
            setProduct(response.product);
        } catch (error) {
            console.log(error.message || error);
        }
    };

    const addToCart = () => {
        if (product) {
            dispatch({ type: 'ADD_ITEM', payload: product });
        }
    };

    const incrementItem = () => {
        if (product) {
            dispatch({ type: 'INCREMENT_ITEM', payload: product });
        }
    };

    const decrementItem = () => {
        if (product) {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({ type: 'DECREMENT_ITEM', payload: product });
            } else {
                dispatch({ type: 'REMOVE_ITEM', payload: product });
            }
        }
    };

    if (!product) {
        return <p>Loading product details...</p>;
    }

    const cartItem = cart.find(item => item.id === product.id);

    // Fonction pour afficher les étoiles en fonction de la note
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="star full" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} className="star half" />);
            } else {
                stars.push(<FaRegStar key={i} className="star empty" />);
            }
        }
        return stars;
    };

    return (
        <div className="product-detail">
            <img src={product?.imageUrl} alt={product?.name} />
            <h1>{product?.name}</h1>
            <div className="rating">{renderStars(product?.rating || 4)}</div>
            <p>{product?.description}</p>
            <span>{product.price.toFixed(2)} XOF</span>
            {cartItem ? (
                <div className="quantity-controls">
                    <button onClick={decrementItem}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={incrementItem}>+</button>
                </div>
            ) : (
                <button className="add-to-cart" onClick={addToCart}>
                    <FaCartPlus /> Add To Cart
                </button>
            )}
        </div>
    );
};

export default ProductDetailsPage;
