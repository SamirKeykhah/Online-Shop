import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { Layout } from './components/Layout';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <Layout isCart={false}>
            <ProductList />
          </Layout>
        }
      />
      <Route
        path="cart"
        element={
          <Layout isCart={true}>
            <Cart />
          </Layout>
        }
      />

      <Route
        path="*"
        element={
          <Layout isCart={false}>
            <div>Nothing here</div>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
