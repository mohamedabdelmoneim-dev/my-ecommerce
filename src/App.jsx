import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import SearchContext from './contexts/SearchContext';
import ProductsContext from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContextProvider';
import LocalStorageContext from './contexts/LocalstorageContext';
import routes from './routes';

import "./assets/CSS/General/general-styles.css";

function App() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://dummyjson.com/products?limit=194');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, []);

    const [localStorageLength, setLocalStorageLength] = useState(localStorage.length);

    useEffect(() => {
        const handleWishlistCounter = () => {
            const wishlistCount = Object.keys(localStorage).filter((key) => key.startsWith('product_card')).length;
            setLocalStorageLength(wishlistCount);
        };

        handleWishlistCounter();
    }, []);

    const [search, setSearch] = useState('');
    
    return (
        <ProductsContext.Provider value={{ products }}>
            <LocalStorageContext.Provider value={{ localStorageLength, setLocalStorageLength }}>
                <SearchContext.Provider value={{ search, setSearch }}>
                    <CartContextProvider>
                        <RouterProvider router={routes} />
                    </CartContextProvider>
                </SearchContext.Provider>
            </LocalStorageContext.Provider>
        </ProductsContext.Provider>
    );
}

export default App;