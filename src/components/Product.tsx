import { ProductType } from '../context/ProductsProvider';
import { ReducerActionType, ReducerAction } from '../context/CartProvider';
import { ReactElement, memo } from 'react';

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement => {
  const img: string = product.image;

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;

  const content = (
    <div className=" col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3 3xl:col-span-2 flex flex-col w-full rounded-lg shadow-md   hover:shadow-xl border py-2">
      <img src={img} alt={product.name} className="mx-auto h-48" />

      <div className="grow flex flex-col p-4 ">
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {product.title}
        </h4>
        <p className="grow mb-2 leading-normal">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(product.price)}
            {itemInCart}
          </p>

          <button
            className="px-4 py-2 m-2 text-sm text-white bg-blue-500 rounded shadow"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
