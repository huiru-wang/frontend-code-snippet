import reactLogo from './assets/react.svg'
import './App.css'
import { ProductCard } from './components/ProductCard'
import { productData } from './lib/data'
import { useState } from 'react'
import { CartProduct, Product } from './lib/types'
import { Cart } from './components/Cart'


/**
 * useReducer：
 * 1. reducer函数由用户定义
 * 2. initialState：state的初始状态
 * 3. initFn：可选，初始化时执行一次
 * 
 * function useReducer(reducer, initialState, initFn) {
 *  const [state, setState] = useState(initialState);
 *  const dispatch = (action) => setState(reducer(state, action));
 *  return [state, dispatch];
 * }
 * 
 */

function App() {

  const [productList] = useState<Product[]>(productData);

  const [cartProductList, setCartProductList] = useState<CartProduct[]>([]);

  const addToCart = (product: Product) => {
    console.log("add: " + product);
    setCartProductList([...cartProductList, { ...product, quantity: 1 }]);
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* 商品详情列表 */}
      <div className="card-container">
        {
          productList.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))
        }
      </div>

      {/* 购物车 */}
      <Cart cartProductList={cartProductList} />

    </>
  )
}

export default App
