//gestion de panier (cart)
import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      //identifier l'élément existant
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      let newCart;

      if (existingItem) {
        // Si l'article existe déjà, incrémenter sa quantité
        newCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si l'article n'existe pas, l'ajouter au panier avec une quantité de 1
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      // Mettre à jour le localStorage avec le nouveau panier
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "REMOVE_ITEM": {
      // Filtrer le panier pour supprimer l'article spécifié
      const newCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      // Mettre à jour le localStorage avec le nouveau panier
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "INCREMENT_ITEM": {
      // Incrémenter la quantité de l'article spécifié
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      // Mettre à jour le localStorage avec le nouveau panier
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "DECREMENT_ITEM": {
      // Décrémenter la quantité de l'article spécifié (si la quantité est supérieure à 1)
      const newCart = state.cart.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      // Mettre à jour le localStorage avec le nouveau panier
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case "CLEAR_CART": {
      // Vider complètement le panier
      localStorage.removeItem("cart");
      return { ...state, cart: [] };
    }
    default:
      // Retourner l'état actuel si l'action n'est pas reconnue
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
