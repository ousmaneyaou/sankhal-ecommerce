import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../../styles/productList.css';


const ProductList = ({products}) => {
    const {cart, dispatch} = useCart();

    // const addToCart = (product) => {
    //     dispatch({type: 'ADD_ITEM', payload: product});
    // }

    const addToCart = (product) => {
        // Vérifier la taille actuelle de localStorage avant d'ajouter un élément
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartString = JSON.stringify([...currentCart, product]);
        
        // Vérifier la taille de localStorage avant d'ajouter
        if (cartString.length < 5000000) { // 5MB max (ou une autre limite en fonction du navigateur)
            dispatch({ type: 'ADD_ITEM', payload: product });
            localStorage.setItem('cart', cartString); // Enregistrer dans localStorage
        } else {
            alert("Votre panier a dépassé la limite de stockage.");
        }
    };

    const incrementItem = (product) => {
        dispatch({type: 'INCREMENT_ITEM', payload: product});
    }

    const decrementItem = (product) => {

        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({type: 'DECREMENT_ITEM', payload: product}); 
        }else{
            dispatch({type: 'REMOVE_ITEM', payload: product}); 
        }
    }


    return(
        <div className="product-list">
                {products.map((product, index) => {
                    const cartItem = cart.find(item => item.id === product.id);
                    return (
                        <div className="product-item" key={index}>
                            <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <span>{product.price.toFixed(2)} XOF</span>
                            </Link>
                            {cartItem ? (
                                <div className="quantity-controls">
                                    <button onClick={()=> decrementItem(product)}> - </button>
                                    <span>{cartItem.quantity}</span>
                                    <button onClick={()=> incrementItem(product)}> + </button>
                                </div>
                            ):(
                                <button onClick={()=> addToCart(product)}>Add To Cart</button>
                            )}
                        </div>
                    )
                })}
        </div>
    )
};

export default ProductList;