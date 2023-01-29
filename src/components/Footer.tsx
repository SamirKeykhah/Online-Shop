import useCart from '../hooks/useCart';

type PropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const pageContent = viewCart ? (
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
