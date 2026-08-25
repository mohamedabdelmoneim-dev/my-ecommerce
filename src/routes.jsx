import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shop from './pages/Shop/Shop';
import Product from './pages/Product';
import Orders from './pages/Account/Orders';
import Payment from './pages/Account/Payment';
import Address from './pages/Account/Address';
import Account from './pages/Account/Account';
import Wishlist from './pages/Account/Wishlist';
import Settings from './pages/Account/Settings';
import Checkout from './pages/Checkout/Checkout';
import ShippingInformation from './components/Checkout/ShippingInformation';
import ConfirmOrder from './components/Checkout/ConfirmOrder';

const routes = createBrowserRouter([{
    element: <MainLayout />,
    children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        {
            path: '/account',
            element: <Account />,
            children: [
                { path: 'wishlist', element: <Wishlist /> },
                { path: 'orders', element: <Orders /> },
                { path: 'address', element: <Address /> },
                { path: 'payment', element: <Payment /> },
                { path: 'settings', element: <Settings /> },
            ],
        },
        { path: '/shop', element: <Shop /> },
        { path: '/shop/:category', element: <Shop /> },
        { path: '/cart', element: <Cart /> },
        { path: '/product/:id', element: <Product /> },
        {
            path: '/checkout',
            element: <Checkout />,
            children: [{ path: 'shipping-information', element: <ShippingInformation /> }],
        },
        { path: '/confirm-order', element: <ConfirmOrder /> },
    ],
},], {
    basename: "/my-ecommerce",
});

export default routes;
