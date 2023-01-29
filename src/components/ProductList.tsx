import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';
import { ReactElement, useState, useCallback } from 'react';
import Product from './Product';
import SearchComponent from './Search';
import DropdownComponent from './Category';

const ProductList = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [categoryValue, setCategoryValue] = useState<string>('all');
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;
  const searchFilter = useCallback(
    (productTitle: string) => {
      const normalizeProductTitle = productTitle.trim().toLocaleLowerCase();
      const normalizeSearchValue = searchValue?.trim().toLocaleLowerCase();
      if ((normalizeSearchValue ?? '').length === 0) return true;
      if (normalizeProductTitle.includes(normalizeSearchValue ?? ''))
        return true;
      return false;
    },
    [searchValue, products]
  );

  const categoryFilter = useCallback(
    (productCategory: string) => {
      if (categoryValue === 'all') return true;
      if (productCategory.includes(categoryValue)) return true;
      return false;
    },
    [categoryValue, products]
  );

  if (products?.length) {
    pageContent = products
      .filter((product) => searchFilter(product.title))
      .filter((product) => categoryFilter(product.category))
      .map((product) => {
        const inCart: boolean = cart.some((item) => item.id === product.id);

        return (
          <Product
            key={product.id}
            product={product}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
            inCart={inCart}
          />
        );
      });
  }

  const content = (
    <main className="main main--products">
      <div className="w-full h-20 pt-2 flex flex-row items-center justify-start space-x-6 ">
        <SearchComponent
          onChange={(text) => {
            setSearchValue(text);
          }}
        />
        <DropdownComponent
          onChange={(text) => {
            setCategoryValue(text);
          }}
        />
      </div>
      <div className="grid grid-cols-12  gap-4">{pageContent}</div>
    </main>
  );

  return content;
};
export default ProductList;
