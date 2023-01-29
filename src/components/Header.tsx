import Nav from './Nav';
import { useFetchUser } from '../api/user/getUser';

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { user } = useFetchUser();

  return (
    <header className="header">
      <div className="header__title-bar">
        <div className="flex flex-row items-center justify-center">
          <div className=" mr-2">
            <img className=" h-9" src="/images/ProfilePic.png"></img>
          </div>
          <div>
            <h1>Hi {user?.name.firstname}</h1>
          </div>
        </div>
        <div className="mx-auto w-72">
          <img src="/images/online_shop_logo1.jpg"></img>
        </div>
        <div className="header__price-box">
          <Nav viewCart={viewCart} setViewCart={setViewCart} />
        </div>
      </div>
    </header>
  );
};
export default Header;
