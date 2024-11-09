import { CartProduct } from "../lib/types";
import { CartProductItem } from "./CartProductItem";


interface CartProps {
    cartProductList: CartProduct[];
    onRemoveFromCart: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}


export const Cart: React.FC<CartProps> = (
    { cartProductList, onRemoveFromCart, onUpdateQuantity }
) => {

    return (
        <div className="cart">
            {cartProductList.map(cartProduct => {
                if (cartProduct.quantity === undefined) {
                    return null;
                }
                return (
                    <CartProductItem
                        key={cartProduct.id}
                        product={cartProduct}
                        quantity={cartProduct.quantity}
                        onRemoveFromCart={onRemoveFromCart}
                        onUpdateQuantity={onUpdateQuantity}
                    />
                )
            })}
        </div>
    )
};