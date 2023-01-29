import { useEffect, useState } from 'react';
import { getProductsCategory } from '../api/product/getCategory';
import { Category } from '../type/TCategory';

const DropdownComponent = ({
  onChange,
}: {
  onChange: (text: string) => void;
}) => {
  const [categoryList, setCategoryList] = useState<Category>([]);
  useEffect(() => {
    const fetchProducts = async (): Promise<Category> => {
      return getProductsCategory();
    };
    fetchProducts().then((categories) => setCategoryList(categories));
  }, []);
  return (
    <div className="relative w-full lg:max-w-sm">
      <select
        onChange={(e) => onChange(e.target.value)}
        defaultValue={'all'}
        className="px-4 py-2 w-full border-b pr-6 focus:outline-none "
      >
        <option value={'all'}>All</option>
        {categoryList.map((category: string) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownComponent;
