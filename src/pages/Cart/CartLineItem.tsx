import { BsTrash3 } from 'react-icons/bs'
import { LineItem } from "@chec/commerce.js/types/line-item"
import './Cart.scss'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import useCart from '../../hooks/useCart'
import { useContext } from 'react'
import { AlertContext } from '../../context/AlertProvider'

type Proptype = {
    item: LineItem
}

const CartLineItem = ({item}: Proptype) => {
    const { updateCart, removeCartItem } = useCart()
    const { alert, setAlert } = useContext(AlertContext)

    const qty = item.quantity

    const decreament = () => {
        qty === 1 ? null : updateCart(item.id, qty - 1)
    }

    const increament = () => {
        qty === 20 ? null : updateCart(item.id, qty + 1)
    }

    const removeItem = () => {
        setAlert({
            ...alert, 
            isAlert: true,
            isAdd: false,
            msg: 'Product removed from cart',
            color: 'red',
            name: item.name
        } )
        removeCartItem(item.id)
    }

    const decreamentStyle = qty === 1 ? 'disabled' : ''
    const increamentStyle = qty === 20 ? 'disabled' : ''

    return (
        <div className="cart-item">
            <div className='left-content'>
                <img src={item.image?.url} />
                <div className='content'>
                    <div className='txt'>
                        <p>{item.name}</p>
                        <span>{item.price.formatted_with_symbol}</span>
                    </div>
                    <div className="qty-box">
                        <AiOutlineMinus className={decreamentStyle} onClick={decreament} />
                        <span>{qty}</span>
                        <AiOutlinePlus className={increamentStyle} onClick={increament} />
                    </div>
                </div>
            </div>
            <div className='right-content'>
                <BsTrash3 className="x-mark" onClick={removeItem} />
                <p>{item.line_total.formatted_with_symbol}</p>
            </div>
        </div>
    )
}

export default CartLineItem