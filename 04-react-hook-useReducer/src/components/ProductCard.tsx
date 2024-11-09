import { Product } from "../lib/types";

interface ProductProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductProps> = ({ product, onAddToCart }) => {
    return (
        <div className="card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart(product)}>➕ Add to Cart</button>
        </div>
    );
};