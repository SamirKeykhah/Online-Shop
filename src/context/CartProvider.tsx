import { useReducer, createContext, ReactElement } from 'react';

export type CartItemType = {
  //sku: string;
  name: string;
  price: number;
  qty: number;
  id: number;
  title: string;
  description: string;
  image: string;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
};

export type ReducerActionType = typeof REDUCER_ACTIONS;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS.ADD: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action');
      }

      const { name, price, id, title, description, image } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        cart: [
          ...filteredCart,
          { name, price, qty, id, title, description, image },
        ],
      };
    }
    case REDUCER_ACTIONS.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload missing in REMOVE action');
      }

      const { id } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTIONS.QUANTITY: {
      if (!action.payload) {
        throw new Error('action.payload missing in QUANTITY action');
      }

      const { id, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExists) {
        throw new Error('Item must exist in order to update quantity');
      }

      const updatedList: CartItemType[] = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, qty };
        } else {
          return { ...item };
        }
      });

      return { ...state, cart: [...updatedList] };
    }
    case REDUCER_ACTIONS.SUBMIT: {
      return { ...state, cart: [] };
    }

    default:
      throw new Error('Unidentified reducer action type');
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  // const cart = state.cart.sort((a, b) => {
  //   const itemA = Number(a.title.slice(-4));
  //   const itemB = Number(b.title.slice(-4));
  //   return itemA - itemB;
  // });
  const cart = state.cart;

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => null,
  REDUCER_ACTIONS: REDUCER_ACTIONS,
  totalItems: 0,
  totalPrice: '',
  cart: [],
};

const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
