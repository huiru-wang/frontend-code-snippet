import reactLogo from './assets/react.svg'
import './App.css'
import { ProductCard } from './components/ProductCard'
import { productData } from './lib/data'
import { useReducer, useState } from 'react'
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
 */

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


function App() {

  const [productList] = useState<Product[]>(productData);

  const [state, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: Product) => {
    console.log("add: " + product);
    const cartProduct: CartProduct = { ...product, quantity: 1 };
    dispatch({ type: CartActionType.ADD, payload: cartProduct });
  }

  const onRemoveFromCart = (id: string) => {
    console.log("remove: " + id);
    dispatch({ type: CartActionType.REMOVE, payload: { id: id } });
  }

  const onUpdateQuantity = (id: string, quantity: number) => {
    console.log("update: " + id + " " + quantity);
    dispatch({ type: CartActionType.UPDATE, payload: { id: id, quantity: quantity } });
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
      <Cart cartProductList={state} onRemoveFromCart={onRemoveFromCart} onUpdateQuantity={onUpdateQuantity} />

    </>
  )
}

export default App
