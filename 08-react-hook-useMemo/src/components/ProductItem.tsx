import { useContext } from "react";
import { Product } from "../lib/types";
import { ThemeContext } from "../context/ThemeContext";

interface ProductProps {
    product: Product;
}

export const ProductItem: React.FC<ProductProps> = ({ product }) => {

    console.log("ProductItem rendered");

    const { theme } = useContext(ThemeContext)

    return (
        <div className={`product-card-${theme}`}>
            <p>{product.name}</p>
            <p>{product.price}</p>
        </div>
    );
};