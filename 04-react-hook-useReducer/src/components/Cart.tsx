import { CartProduct } from "../lib/types";
import { CartProductItem } from "./CartProductItem";
import '../App.css'

interface CartProps {
    cartProductList: CartProduct[];
    onRemoveFromCart: (cartProduct: CartProduct) => void;
    onUpdateQuantity: (cartProduct: CartProduct, updateQuantity: number) => void;
}


export const Cart: React.FC<CartProps> = (
    { cartProductList, onRemoveFromCart, onUpdateQuantity }
) => {

    return (
        <div className="cart">
            <div className="cart-header">Shopping Cart</div>
            <div>
                {cartProductList.map(cartProduct => {
                    return (
                        <CartProductItem
                            key={cartProduct.id}
                            product={cartProduct}
                            onRemoveFromCart={onRemoveFromCart}
                            onUpdateQuantity={onUpdateQuantity}
                        />
                    )
                })}
            </div>
            <div className="cart-total">Total: ${cartProductList.reduce((acc, cur) => {
                return acc + (cur.price * cur.quantity!);
            }, 0).toFixed(2)}
            </div>
        </div>
    )
};