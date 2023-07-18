import { useContext } from "react"
import { CartContext } from "../context/CartProvider"
import commerce from "../lib/commerce"


const useCart = () => {
    const { cart, setCart } = useContext(CartContext)

    const addToCart = (productId: string, qty: number) => {
        commerce.cart.add(productId, qty)
            .then((response) => setCart(response.cart))
            .catch((err) => console.log(err))
    }

    const updateCart = (itemId: string, qty: number) => {
        commerce.cart.update(itemId, { quantity: qty })
            .then(response => {
                setCart(response.cart)
            })
            .catch((err) => console.log(err))
    }

    const removeCartItem = (itemId: string) => {
        commerce.cart.remove(itemId)
            .then((response) => setCart(response.cart))
            .catch((err) => console.log(err))
    }

    const emptyCart = () => {
        commerce.cart.empty()
            .then((response) => setCart(response.cart))
            .catch((err) => console.log(err))
    }
    return { cart, addToCart, updateCart, removeCartItem, emptyCart, setCart }
}

export default useCart