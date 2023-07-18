import { Asset } from "@chec/commerce.js/types/asset";
import { ReactElement, useRef, useState } from "react";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'
import './ImageGallery.scss'

type propType = {
    imgUrls: Asset[]
}


const ImageGallery = ({ imgUrls }: propType) => {
    // States
    const [imageToShow, setImageToShow] = useState(imgUrls[0].url)
    const [imageIndex, setImageIndex] = useState<number | null>(1)
    
    //looping through our images array to create img elements
    const imageCards: ReactElement | ReactElement[] = imgUrls.map((image) => {
        const style = imageToShow === image.url ? 'img-toggle on' : 'img-toggle';
        return(
            <div  key={image.url} className={style}>
                <img onClick={() => showImage(image.url)} src={image.url} className="rounded-lg" alt="" />
            </div>
        )
    });

    //function to show a specific image in the lightbox, amd make lightbox visible
    const showImage = (image: string) => {
        setImageToShow(image)
    };

    const containerRef = useRef<HTMLDivElement>(null!);

    const scrollNext = () => {
        imageIndex! < imageCards.length
            ? setImageIndex(prevIndex => prevIndex! + 1) 
            : null
        containerRef.current.scrollLeft += containerRef.current.offsetWidth
    };

    const scrollPrev = () => {
        imageIndex! == 1
            ? null
            : setImageIndex(prevIndex => prevIndex! - 1) 
        containerRef.current.scrollLeft -= containerRef.current.offsetWidth; // Scroll to the previous image
    };

    const nextStyle = imageIndex! < imageCards.length ? '' : 'disabled'
    const prevStyle = imageIndex! == 1 ? 'disabled' : ''

    return (
    <>
        <div className="product-images">
            <div className="main-img">
                <img src={imageToShow} alt="" />
            </div>
            <div className="img-toggle-con">
                {imageCards}
            </div>
        </div>
        <div className="img-toggle-con-mobile" ref={containerRef}>
            {imageCards}
        </div>
        <div className="scroll-btns">
            <LiaAngleLeftSolid className={prevStyle} onClick={scrollPrev} />
                <div>
                    {imageIndex}
                    /
                    {imageCards.length}
                </div>
            <LiaAngleRightSolid className={nextStyle} onClick={scrollNext} />
        </div>
    </>
    );
}

export default ImageGallery