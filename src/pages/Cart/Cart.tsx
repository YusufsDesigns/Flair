import { Link } from 'react-router-dom'
import './Cart.scss'
import CartLineItem from './CartLineItem'
import useCart from '../../hooks/useCart'
import { Loader } from '../../components'
import { ReactElement, useState } from 'react'

const Cart = () => {
    const [checkout, setCheckout] = useState(false)
    const { cart, emptyCart } = useCart()

    const cartCheckout = () => {
        emptyCart()
        setCheckout(true)
    }


    let cartContent: ReactElement | ReactElement[] = (
        <Loader size="big" />
    )

    if(cart?.line_items){
        cartContent = cart?.line_items.map(item => (
            <CartLineItem key={item.id} item={item} />
        ))
    }

    const pageContent = cart?.line_items.length !== 0
        ? (
            <div className='cart'>
                <div className="cart-nav">
                    <h1>Your Cart</h1>
                    <Link to={'/'}>Continue Shopping</Link>
                </div>
                <div>
                    <div className="cart-items">
                        {cartContent}
                    </div>
                </div>
                <div className='checkout'>
                    <p className='sub'>Subtotal: <span>{cart?.subtotal.formatted_with_symbol}</span></p>
                    <p>Taxes and shipping calculated at checkout</p>
                    <button onClick={cartCheckout}>Checkout</button>
                </div>
            </div>
            
        )
        : (
            <div className='cart-empty'>
                <p>Your cart is empty</p>
                <Link to={'/'}>Continue Shopping</Link>
            </div>
        )

        const mainContent = checkout ? 
            (
                <div className='checkout-msg'>
                    <p>Thanks For Shopping</p>
                </div>
            ) : pageContent

    return (
        <>
            {mainContent}
        </>
    )
}

export default Cart