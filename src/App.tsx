import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {viewCart ? <div>Cart</div> : <div>Product List </div>}
    </>
  );

  return content;
}

export default App;
