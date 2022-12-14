import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Loader, Nav, PrivateRoute } from './components';
import './App.css';
import {
  CartList,
  Checkout,
  ErrorPage,
  Home,
  ProductDetails,
  ProductList,
  Profile,
  WishList,
} from './pages';
import Login from './pages/Auth/Login/Login';
import { useAuth } from './contexts/auth-context';
import { useData } from './contexts/data-context';

import SignUp from './pages/Auth/Signup/Signup';
import Logout from './pages/Auth/Logout/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Addresses, Details, Orders } from './pages/Profile/components';
import { useThemeHook } from './GlobalComponents/ThemeProvider';

function App() {
  const [theme] = useThemeHook();

  const { token } = useAuth();
  const { loader } = useData();
  return (
    <div className='app'>

      <div className={theme? 'bg-black': 'bg-light'} >
    {console.log("================"+theme)}
     
      {loader && <Loader />}
      <ToastContainer
        position='bottom-right'
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme='colored'
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Nav />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/404' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to={'/404'} />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route
          path='/wishlist'
          element={
              <WishList />
          }
        />
        <Route
          path='/checkout'
          element={
              <Checkout />
          }
        />
        <Route
          path='/cartlist'
          element={
              <CartList />
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path='details' element={<Details />} />
          <Route path='addresses' element={<Addresses />} />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
