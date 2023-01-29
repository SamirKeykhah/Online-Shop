import useCart from '../hooks/useCart';
import { Link } from 'react-router-dom';
type PropsType = {
  isCart: boolean;
};

const Nav = ({ isCart }: PropsType) => {
  const { totalItems } = useCart();
  const button = isCart ? (
    <Link
      className="px-4 py-2 m-2 text-sm text-white bg-blue-500 rounded shadow"
      to="/"
    >
      View Products
    </Link>
  ) : (
    <Link
      className="px-4 py-2 m-2 text-sm w-[90px] text-white bg-blue-500 rounded shadow flex flex-row items-center justify-between"
      to="/cart"
    >
      Cart{' '}
      <div className="bg-red-500 w-5 h-5 rounded-full text-white flex items-center justify-center">
        {totalItems}
      </div>
    </Link>
  );

  const content = <nav className="nav">{button}</nav>;

  return content;
};
export default Nav;
