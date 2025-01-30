import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    
    if(existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem => cartItem.id === productToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
}

const deleteCartItem = (cartItems, productToDelete) => cartItems.filter(cartItem => cartItem.id !== productToDelete.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItem: () => {},
    deleteItem: () => {},
    cartCount: 0,
    total: 0
});


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setTotal(newTotal);
    }, [cartItems]);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = productToAdd => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItem = productToRemove => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const deleteItem = productToDelete => {
        setCartItems(deleteCartItem(cartItems, productToDelete));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItem, deleteItem, cartItems, cartCount, total };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}