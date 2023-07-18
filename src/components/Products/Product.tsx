import { ProductType } from "../../context/ProductProvider"
import Logo from '../../assets/Logo.png'
import { Link } from "react-router-dom"


type PropType = {
    product: ProductType
}

const Product = ({product}: PropType) => {

    if(!product.image){
        return Logo
    }
    return (
        <Link to={`/product/${product.id}`} className="product">
            <div>
                <img src={product.image.url} alt="" />
            </div>
            <p>{product.name}</p>
            <p className="price">{product.price.formatted_with_symbol}</p>
        </Link>
    )
}

export default Product