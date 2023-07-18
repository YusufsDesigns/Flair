import { Search } from '..'
import Logo from '../../assets/Logo.png'
import { FiShoppingBag } from 'react-icons/fi'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'

const Navbar = () => {
    const { cart } = useCart()
    return (
        <div className="navbar align-items">
            <Link to={'/'} className="logo align-items">
                <img src={Logo} alt="" />
                <span>Flair</span>
            </Link>
            <div className='nav-icons align-items'>
                <Search />
                <Link to={'/cart'} className='cart-icon align-items'>
                    <FiShoppingBag />
                    <span>{cart?.total_items}</span>
                </Link>
            </div>
        </div>
    )
}

export default Navbar