import { useReducer } from "react";
import { CartProduct } from "../lib/types";
import { CartProductItem } from "./CartProductItem";


interface CartProps {
    cartProductList: CartProduct[];
}

enum CartActionType {
    ADD,
    REMOVE,
    UPDATE
}

const cartReducer = (state: CartProduct[], action: { type: CartActionType, payload: CartProduct }): CartProduct[] => {
    switch (action.type) {
        case CartActionType.ADD: {
            return [...state, action.payload];
        }
        case CartActionType.REMOVE: {
            return state.filter(item => item.id !== action.payload.id);
        }
        case CartActionType.UPDATE: {
            return state.map(item => item.id === action.payload.id ? action.payload : item);
        }
        default: return state;
    }
}


export const Cart: React.FC<CartProps> = (
    { cartProductList }
) => {

    const [state, dispatch] = useReducer(cartReducer, cartProductList);

    return (
        <div className="cart">
            {state.map(cartProduct => {
                return (
                    <CartProductItem
                        key={cartProduct.id}
                        product={cartProduct}
                        quantity={cartProduct.quantity}
                        onRemoveFromCart={() => dispatch({ type: CartActionType.REMOVE, payload: cartProduct })}
                        onUpdateQuantity={() => dispatch({ type: CartActionType.UPDATE, payload: cartProduct })}
                    />
                )
            })}
        </div>
    )
};