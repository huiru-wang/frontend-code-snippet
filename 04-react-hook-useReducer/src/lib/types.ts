
// 商品
export interface Product {
    id: string;
    price: number;
    name?: string;
    image?: string;
}

// 购物车商品
export interface CartProduct extends Product {
    quantity: number;
}