import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { deleteItem, addItemToCart, removeItem } = useContext(CartContext);

    const deleteItemHandler = () => deleteItem(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItem(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <span className="name">{name}</span>
            <span className="quantity"> 
                <div className="arrow" onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={deleteItemHandler}>&#10005;</div>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;