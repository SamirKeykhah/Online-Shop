import useCart from '../hooks/useCart';
import { useState } from 'react';
import CartLineItem from './CartLineItem';

const TableHeader = () => {
  return (
    <tr className={`bg-gray-300 border-b`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        Number
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 ">title</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 ">
        Description
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        Price
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        Quantity
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        Total Price
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
    </tr>
  );
};
const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <div className="overflow-x-auto">
        <table className="cart w-full">
          <TableHeader></TableHeader>
          {cart.map((item, i) => {
            return (
              <CartLineItem
                key={item.id}
                item={item}
                itemNumber={i + 1}
                dispatch={dispatch}
                REDUCER_ACTIONS={REDUCER_ACTIONS}
                backgroundColor={i % 2 ? 'white' : 'gray'}
              />
            );
          })}
        </table>
      </div>
      <div className="cart__totals  text-gray-800 ">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="cart__submit px-4 py-2 text-sm text-white bg-blue-500 rounded shadow"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return content;
};
export default Cart;
