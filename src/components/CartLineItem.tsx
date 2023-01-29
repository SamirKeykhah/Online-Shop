import { memo } from 'react';
import { CartItemType } from '../context/CartProvider';
import { ReducerAction } from '../context/CartProvider';
import { ReducerActionType } from '../context/CartProvider';

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  backgroundColor: 'gray' | 'white';
  itemNumber: number;
};

const CartLineItem = ({
  item,
  dispatch,
  REDUCER_ACTIONS,
  backgroundColor,
  itemNumber,
}: PropsType) => {
  const lineTotal: number = item.qty * item.price;

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  return (
    <tr
      className={`${
        backgroundColor === 'gray' ? 'bg-gray-100' : 'bg-white'
      } border-b`}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {itemNumber}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 ">
        {item.title}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 ">
        {item.description}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.price)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <label htmlFor="itemQty">{item.qty}</label>
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(lineTotal)}
      </td>

      <td>
        <div className=" justify-center items-center flex ">
          <button
            aria-label="Remove Item From Cart"
            title="Remove Item From Cart"
            onClick={onRemoveFromCart}
            className="text-gray-600 transition hover:text-blue-600"
          >
            <span className="sr-only">Remove item</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
