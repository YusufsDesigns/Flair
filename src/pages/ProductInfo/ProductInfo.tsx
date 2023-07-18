import { ReactElement, useContext, useEffect, useState } from "react";
import commerce from "../../lib/commerce";
import { ImageGallery, Loader } from "../../components";
import { Variant } from "@chec/commerce.js/types/variant";
import { stripHtml } from "string-strip-html";
import './ProductInfo.scss'
import { Product } from "@chec/commerce.js/types/product";
import { Params, useLoaderData } from "react-router-dom";
import { ProductType } from "../../context/ProductProvider";
import useCart from "../../hooks/useCart";
import { AlertContext } from "../../context/AlertProvider";

const ProductInfo = () => {
    const [variant, setVariant] = useState<Variant[]>([])
    const { addToCart } = useCart()
    const product = useLoaderData() as ProductType
    const { alert, setAlert } = useContext(AlertContext)

    const addItemToCart = () => {
        setAlert({
            ...alert, 
            isAlert: true,
            isAdd: true,
            msg: 'Product added to cart',
            color: 'green',
            name: product.name
        } )
        addToCart(product.id, 1)
    }

    const { result } = stripHtml(product?.description || '')

    const fetchProductVariant = () => {
        if(product?.id === undefined) return
        commerce.products.getVariants(product.id)
            .then((variants) => setVariant(variants.data))
            .catch((err) => console.error(err));
    }

    let pageContent: ReactElement | ReactElement[] = (
        <Loader size="big" />
    )

    const ImgUrls = variant.map((url) => (
        <ImageGallery key={url.id} imgUrls={url.assets}  />
    ))

    if(variant.length !== 0){
        pageContent = (
            <div className="product">
                {ImgUrls}
                <div className="product-info">
                    <h1>{product?.name}</h1>
                    <p className="price">{product?.price.formatted_with_symbol}</p>
                    <p className="desc">{result}</p>
                    <button onClick={addItemToCart}>Add to cart</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchProductVariant()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    return (
        <>
            {pageContent}
        </>
    )
}

type paramType = {
    params: Params
}

export const ProductInfoLoader = async ({ params }: paramType): Promise<Product> => {
    const { id } = params

    const data = await commerce.products.retrieve(id || '')
    return data
}

export default ProductInfo