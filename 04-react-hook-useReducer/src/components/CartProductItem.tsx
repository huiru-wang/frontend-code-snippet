import { CartProduct } from "../lib/types"

interface CartProductItemProps {
    product: CartProduct;
    quantity: number;
    onRemoveFromCart: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}


export const CartProductItem: React.FC<CartProductItemProps> = (
    { product, quantity, onRemoveFromCart, onUpdateQuantity }
) => {
    return (
        <div className="cart-item">
            <img src={product.image} alt={product.name} />
            <div className="cart-item-details">
                <h4>{product.name}</h4>
                <p>${product.price}</p>
                <p>Quantity: {quantity}</p>
            </div>
            <div className="cart-item-actions">
                <button onClick={() => onRemoveFromCart(product.id)}>Remove</button>
            </div>
            <div className="cart-item-actions">
                <button onClick={() => onUpdateQuantity(product.id, quantity - 1)}>-</button>
            </div>
        </div>
    )
}