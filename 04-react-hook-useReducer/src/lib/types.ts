
// 商品
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

// 购物车商品
export interface CartProduct extends Product {
    quantity: number;
}