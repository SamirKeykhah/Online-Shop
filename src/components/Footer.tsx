import useCart from '../hooks/useCart';

type PropsType = {
  isCart: boolean;
};

const Footer = ({ isCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const pageContent = isCart ? (
    <p className=" text-gray-400">Online Shop</p>
  ) : (
    <>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: {totalPrice}</p>
      <p className=" text-gray-400">Online Shop</p>
    </>
  );

  const content = <footer className="footer">{pageContent}</footer>;

  return content;
};
export default Footer;
