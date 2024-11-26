import React from "react";
import { Product } from "../lib/types";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
    products: Product[];
}
const ProductList: React.FC<ProductListProps> = ({ products }) => {

    console.log("ProductList rendered");

    return (
        <div className="product-list">
            {
                products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))
            }
        </div>
    );
};

export default React.memo(ProductList);