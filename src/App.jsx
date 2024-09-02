import './App.css'
import { NavLink, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout';
import Products from './components/products/Products';
import Brand from './components/brand/Brand';
import Category from './components/category/Category';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Notfound from './components/notfound/Notfound';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './components/context/AuthContext';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/productDetails/ProductDetails';
import CartContextPrivider from './components/context/CartContextt';
import Cart from './components/cart/Cart';
import Payment from './components/payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import WishList from './components/wishlist/WishList';
import Forget from './components/forget/Forget';
import Home from './components/Home/Home';
function App() {
  const router = createBrowserRouter([{
    path: "/", element: <Layout />, children: [
      { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "/brand", element: <ProtectedRoute><Brand /></ProtectedRoute> },
      { path: "/category", element: <ProtectedRoute> <Category /></ProtectedRoute> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/forget", element: <Forget /> },
      { path: "/finalprojectreact", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "/productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "/payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: "/allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "/wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "*", element: <Notfound /> }
    ]
  }])
  const x = new QueryClient();
  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider >
        <CartContextPrivider>
          <Toaster />
          <RouterProvider router={router} />
        </CartContextPrivider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
export default App
