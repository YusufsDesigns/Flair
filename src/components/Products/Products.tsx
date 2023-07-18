import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import useProduct from '../../hooks/useProduct'
import Product from './Product'
import './Products.scss'
import commerce from '../../lib/commerce'
import { Category } from '@chec/commerce.js/types/category'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { Loader } from '..'

const Products = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
    const { products, setProducts, checkedItem, setCheckedItem } = useProduct()

    const productsList = products.map(product => (
        <Product key={product.id} product={product} />
    ))

    const fetchCategories = () => {
        commerce.categories.list()
            .then((category) => setCategories(category.data))
            .catch((error) => console.log(error));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setCheckedItem(value)
        setProducts([])
    }

    const category = categories.map((data) => (
        <div key={data.id} className='category'>
            <input 
            type="radio" 
            id={data.name} 
            value={data.name} 
            checked={checkedItem === data.name}
            onChange={handleChange}
        />
            <label htmlFor={data.name}>{data.name}</label>
        </div>
    ))

    let productGroup: ReactElement | ReactElement[] = (
        <Loader size='big' />
    )

    if(products.length !== 0) {
        const style = products.length === 1 ? 'products flex' : 'products'
        productGroup = (
            <>
                <div className={style}>
                    {productsList}
                </div>
            </>
        )
    }

    
        

    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <div className="products-container">
            <h1>Products</h1>
                <div className='products-group'>
                    <div className="categories-container">
                        <div className='category-top'>
                            <h4>Category</h4>
                            {isCategoriesOpen 
                                ? 
                                <FaAngleUp onClick={() => setIsCategoriesOpen(false)} /> 
                                : 
                                <FaAngleDown onClick={() => setIsCategoriesOpen(true)} />
                            }
                        </div>
                        <div className={isCategoriesOpen ? 'categories' : 'categories closed'}>
                            <form>
                                {category}
                            </form>
                        </div>
                    </div>
                    {productGroup}
                </div>
        </div>
    )
}

export default Products