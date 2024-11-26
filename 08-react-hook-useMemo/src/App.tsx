import { useMemo, useState } from 'react'
import './App.css'
import FilterBar from './components/FilterBar'
import ProductList from './components/ProductList'
import { productData } from './lib/data'
import { Product } from './lib/types'

function App() {

  console.log("App rendered");

  const [products] = useState<Product[]>(productData);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [keyword, setKeyword] = useState<string>('');

  const [count, setCount] = useState(0);

  const xxx = () => {
    console.log("xxxxxxxx");

  }

  /**
   * 缓存过滤后的商品列表
   */
  const filteredProducts = useMemo(() => {

    console.log('Compute filteredProducts');

    return products.filter(product => {
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(keyword.toLowerCase());
      return matchesPrice && matchesSearch;
    });

  }, [products, minPrice, maxPrice, keyword]);

  const onMinPriceChange = (min: number) => {
    setMinPrice(min);
  };

  const onMaxPriceChange = (max: number) => {
    setMaxPrice(max);
  };

  const onSearchKeywordChange = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div className='container'>

      {/* 执行count 不触发 filteredProducts的计算 */}
      <div>
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      </div>

      <FilterBar
        minPrice={minPrice}
        maxPrice={maxPrice}
        keyword={keyword}
        onMinPriceChange={onMinPriceChange}
        onMaxPriceChange={onMaxPriceChange}
        onSearchKeywordChange={onSearchKeywordChange}
      />
      <ProductList products={filteredProducts} />
    </div>
  )
}

export default App
