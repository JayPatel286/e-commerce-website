import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Authentication from './pages/Authentication';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import Cart from './pages/Cart';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Dashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import UpdateProduct from './pages/Admin/UpdateProduct';
import UpdateOrder from './pages/Admin/UpdateOrder';
import AdminUsers from './pages/Admin/AdminUsers';
import UpdateUser from './pages/Admin/UpdateUser';
import AdminReviews from './pages/Admin/AdminReviews';
import Home from './pages/Home';
import ProductDetails from './pages/Product/ProductDetails';
import Products from './pages/Product/Products';
import Shipping from './pages/Checkout/Shipping';
import Payment from './pages/Checkout/Payment';
import Success from './pages/Checkout/Success';
import MyOrders from './pages/Order/MyOrders';
import OrderDetails from './pages/Order/OrderDetails';
import ConfirmOrder from './pages/Checkout/ConfirmOrder';

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripe_api_key);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, [stripeApiKey]);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/login" element={<Authentication />} />

        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Authentication />}
        />

        {/* TODO: Cart Design for future upgrade */}
        {/* https://dribbble.com/shots/17776489-Shopping-Cart */}
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/shipping"
          element={isAuthenticated ? <Shipping /> : <Authentication />}
        />

        <Route
          path="/confirm/order"
          element={isAuthenticated ? <ConfirmOrder /> : <Authentication />}
        />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              isAuthenticated ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : (
                <Authentication />
              )
            }
          />
        )}

        <Route
          path="/success"
          element={isAuthenticated ? <Success /> : <Authentication />}
        />

        {/* Order page design */}
        {/* https://dribbble.com/shots/17920706-Order-Info */}
        <Route
          path="/orders"
          element={isAuthenticated ? <MyOrders /> : <Authentication />}
        />

        <Route
          path="/order/:id"
          element={isAuthenticated ? <OrderDetails /> : <Authentication />}
        />

        {/* ! Admin Routes */}
        {/* Admin Dashboard */}
        {/* https://www.behance.net/gallery/104072071/E-commerce-Dashboard-UI-UX-Design */}
        {/* https://www.bootstrapdash.com/blog/ecommerce-website-admin-template */}
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <Dashboard />
            ) : (
              <Authentication />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <AdminProducts />
            ) : (
              <Authentication />
            )
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <UpdateProduct />
            ) : (
              <Authentication />
            )
          }
        />

        <Route
          path="/admin/orders"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <AdminOrders />
            ) : (
              <Authentication />
            )
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <UpdateOrder />
            ) : (
              <Authentication />
            )
          }
        />

        <Route
          path="/admin/users"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <AdminUsers />
            ) : (
              <Authentication />
            )
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <UpdateUser />
            ) : (
              <Authentication />
            )
          }
        />

        <Route
          path="/admin/reviews"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <AdminReviews />
            ) : (
              <Authentication />
            )
          }
        />
        {/* https://dribbble.com/shots/15781384/attachments/7589449?mode=media */}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
