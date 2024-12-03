import { CartProduct } from "../lib/types"

interface CartProductItemProps {
    product: CartProduct;
    onRemoveFromCart: (cartProduct: CartProduct) => void;
    onUpdateQuantity: (cartProduct: CartProduct, updateQuantity: number) => void;
}

export const CartProductItem: React.FC<CartProductItemProps> = (
    { product, onRemoveFromCart, onUpdateQuantity }
) => {
    return (
        <div className="cart-item">
            <img className="cart-img" src={product.image} alt={product.name} />
            <div className="cart-item-details">
                <h4>{product.name}</h4>
                <p>${product.price}</p>
            </div>
            <div className="cart-item-quantity">

                <div className="cart-item-actions">
                    <button onClick={() => onUpdateQuantity(product, -1)}>-</button>
                </div>

                <p>{product.quantity}</p>

                <div className="cart-item-actions">
                    <button onClick={() => onUpdateQuantity(product, 1)}>+</button>
                </div>

                <div className="cart-item-actions remove-button">
                    <button onClick={() => onRemoveFromCart(product)}>Remove</button>
                </div>
            </div>
        </div>
    )
}