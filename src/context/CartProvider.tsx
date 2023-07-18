/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement, createContext, useEffect, useState } from "react";
import commerce from "../lib/commerce";
import { Cart } from "@chec/commerce.js/types/cart";


export type cartType = {
    cart: Cart,
    setCart: React.Dispatch<React.SetStateAction<Cart>>
}

const initCartContext: cartType = {
    cart: {
        id: '',
        total_items: 0,
        total_unique_items: 0,
        subtotal: {
            raw: 0,
            formatted_with_symbol: ''
        },
        hosted_checkout_url: '',
        line_items: []
    },
    setCart: () => {}
}

export const CartContext = createContext(initCartContext)

type childrenType = {
    children?: ReactElement | ReactElement[]
}

const CartProvider = ({children}: childrenType): ReactElement => {
    const [cart, setCart] = useState<Cart>({
        id: '',
        total_items: 0,
        total_unique_items: 0,
        subtotal: {
            raw: 0,
            formatted_with_symbol: ''
        },
        hosted_checkout_url: '',
        line_items: []
    })

    const fetchCart = () => {
        commerce.cart.retrieve().then((cart) => {
            setCart(cart);
        }).catch((error) => {
            console.log('There was an error fetching the cart', error);
        });
    }
    

    useEffect(() => {
        fetchCart()
    })
    

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider