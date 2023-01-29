import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import { useState } from 'react';
import Cart from './components/Cart';

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );

  return content;
}

export default App;
