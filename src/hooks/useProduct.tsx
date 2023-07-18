import { useContext } from "react"
import { ProductsContext, UseProductsContextType } from "../context/ProductProvider"


const useProduct = (): UseProductsContextType => {
    return useContext(ProductsContext)
}

export default useProduct