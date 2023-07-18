/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement, createContext, useEffect, useState } from "react"
import commerce from "../lib/commerce"
import { Asset } from "@chec/commerce.js/types/asset";
import { Price } from "@chec/commerce.js/types/price";

export type ProductType = {
    id: string;
    name: string;
    description: string;
    price: Price;
    sku: string | null;
    image: Asset | null;
}

export type UseProductsContextType = { 
    products: ProductType[], 
    checkedItem: string,
    setCheckedItem: React.Dispatch<React.SetStateAction<string>>,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
}

const initContextState: UseProductsContextType = { 
    products: [],
    checkedItem: '',
    setCheckedItem: () => {},
    setProducts: () => {}
}

export const ProductsContext = createContext(initContextState)

type childrenType = {
    children?: ReactElement | ReactElement[]
}

const ProductProvider = ({ children }: childrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [checkedItem, setCheckedItem] = useState('All')

    const fetchProducts = () => {
        commerce.products.list({
            category_slug: [checkedItem],
            })
            .then((product) => {
                const productArray: ProductType[] = product.data.map(product => {
                    return {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        sku: product.sku,
                        image: product.image,
                    }
                })
                setProducts(productArray)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedItem])

    return (
        <ProductsContext.Provider value={{products, setProducts, checkedItem, setCheckedItem}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductProvider