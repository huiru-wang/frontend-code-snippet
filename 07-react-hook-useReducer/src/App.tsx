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
 * useReducer必须保持纯粹、幂等，每一个Action都应该作为单一的变更，而不是拆分为多个变更；
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
  const updateProduct = action.payload;
  switch (action.type) {
    case CartActionType.ADD: {
      return [...state, Object.assign({}, updateProduct)];
    }

    case CartActionType.REMOVE: {
      return state.filter(item => item.id !== updateProduct.id);
    }

    case CartActionType.UPDATE: {
      return state.map(item => item.id === updateProduct.id ? updateProduct : item);
    }
    default: return state;
  }
}


function App() {

  const [productList] = useState<Product[]>(productData);

  const [state, dispatch] = useReducer(cartReducer, []);

  /**
   * 添加商品到购物车
   * @param product 商品
   */
  const addToCart = (product: Product) => {
    const cartProduct: CartProduct = { ...product, quantity: 1 };
    let existProduct: CartProduct | undefined;

    // 检查是否已经有了该商品
    if (state) {
      existProduct = state.find(item => item.id === cartProduct.id);
    }

    // 有则累加，无则新增
    // ?? 0 表示如果为null或undefined 取默认值0
    if (existProduct) {
      const updatedCartProduct = { ...existProduct, quantity: (existProduct.quantity ?? 0) + 1 };
      dispatch({ type: CartActionType.UPDATE, payload: updatedCartProduct });
    } else {
      dispatch({ type: CartActionType.ADD, payload: cartProduct });
    }
  }

  /**
   * 删除购物车内商品
   * @param cartProduct 购物车内商品
   */
  const onRemoveFromCart = (cartProduct: CartProduct) => {
    dispatch({ type: CartActionType.REMOVE, payload: cartProduct });
  }

  /**
   * 更新购物车内商品数量
   * @param cartProduct 购物车内商品
   * @param updateQuantity 更新的数量, 1或-1
   */
  const onUpdateQuantity = (cartProduct: CartProduct, updateQuantity: number) => {
    const product = { ...cartProduct, quantity: cartProduct.quantity + updateQuantity }
    if (product.quantity <= 0) {
      dispatch({ type: CartActionType.REMOVE, payload: product });
    } else {
      dispatch({ type: CartActionType.UPDATE, payload: product });
    }
  }

  return (
    <>

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
