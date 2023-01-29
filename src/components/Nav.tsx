import useCart from '../hooks/useCart';

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems } = useCart();
  const button = viewCart ? (
    <button
      className="px-4 py-2 m-2 text-sm text-white bg-blue-500 rounded shadow"
      onClick={() => setViewCart(false)}
    >
      View Products
    </button>
  ) : (
    <button
      className="px-4 py-2 m-2 text-sm w-[90px] text-white bg-blue-500 rounded shadow flex flex-row items-center justify-between"
      onClick={() => setViewCart(true)}
    >
      Cart{' '}
      <div className="bg-red-500 w-5 h-5 rounded-full text-white flex items-center justify-center">
        {totalItems}
      </div>
    </button>
  );

  const content = <nav className="nav">{button}</nav>;

  return content;
};
export default Nav;
