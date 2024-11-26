import { useContext } from "react";
import { Product } from "../lib/types";

interface ProductProps {
    product: Product;
}

export const ProductItem: React.FC<ProductProps> = ({ product }) => {

    console.log("ProductItem rendered");


    return (
        <div className={`product-card`}>
            <p>{product.name}</p>
            <p>{product.price}</p>
        </div>
    );
};