import { createContext, useEffect, useState } from "react";
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    useEffect(() => {
        // get Data
    }, []);

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export default ProductsContext;