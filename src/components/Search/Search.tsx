import { AiOutlineSearch } from 'react-icons/ai'
import { HiOutlineX } from 'react-icons/hi'
import './Search.scss'
import { ReactElement, useEffect, useState } from 'react'
import commerce from '../../lib/commerce'
import { Loader } from '..'
import { Product } from '@chec/commerce.js/types/product'
import { Link } from 'react-router-dom'

const Search = () => {
    const [searchBar, setSearchBar] = useState(false)
    const [text, setText] = useState('')
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([])

    const searchProducts = () => {
        commerce.products.list({
            query: text,
        })
        .then(response => {setSearchedProducts(response.data);
        })
        .catch(err => console.log(err))
    }

    let searchContent: ReactElement | ReactElement[] = (
        <Loader size='small' />
    )

    const clodeModul = () => {
        setText('')
        setSearchBar(false)
    }

    if(searchedProducts?.length !== 0){
        if(searchedProducts === undefined){
            searchContent = <span>No products found</span>
        } else{
            searchContent = searchedProducts?.map(item => (
                <div key={item.id} onClick={clodeModul}>
                    <Link to={`/product/${item.id}`} className='search-item'>
                        <img src={item.image?.url} alt="" />
                        <span>{item?.name}</span>
                    </Link>
                </div>
            ))
        }
    }

    const style = text.length > 0 ? 'product-card' : 'product-card hidden'
    const mobileStyle = text.length > 0 ? 'product-card-mobile' : 'product-card-mobile hidden'

    useEffect(() => {
        searchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])


    return (
        <>
            <AiOutlineSearch onClick={() => setSearchBar(true)} />
            <div className={searchBar ? 'search-modul flex' : 'search-modul'}>
                <div className="search-bar center">
                    <div className='align-items'>
                        <input 
                            type="text" 
                            placeholder='Search products...' 
                            value={text} 
                            onChange={(e) => setText(e.target.value)}
                        />

                        <AiOutlineSearch />
                        <div className={style}>
                            <div className='search-title'>
                                <p>PRODUCTS</p>
                            </div>
                            {searchContent}
                        </div>
                    </div>
                    <HiOutlineX onClick={clodeModul} />
                </div>
                <div className={mobileStyle}>
                    <div className='search-title'>
                        <p>PRODUCTS</p>
                    </div>
                    {searchContent}
                </div>
            </div>
        </>
    )
}

export default Search