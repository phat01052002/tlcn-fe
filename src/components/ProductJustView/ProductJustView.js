import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import Product from '../Product/Product';
import Carousel from 'react-multi-carousel';
import './ProductJustView.css';
export default function ProductJustView() {
    const listProductJustView = JSON.parse(sessionStorage.getItem('productJustView'));
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 576 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };
    return (
        <div className="product-just-view">
            {listProductJustView != null ? (
                <>
                    <i class="fa-solid fa-eye fa-fade fa-2xl left-i"></i>
                    <i class="fa-solid fa-eye fa-fade fa-2xl right-i"></i>
                    <div className="product-just-view-tittle">Các sản phẩm vừa xem</div>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        keyBoardControl={true}
                        customTransition="all 1s"
                        transitionDuration={1000}
                        removeArrowOnDeviceType={['mobile']}
                    >
                        {listProductJustView.map((product, index) => (
                            <Product key={product.productId + index} product={product} type={'sale'} />
                        ))}
                    </Carousel>
                </>
            ) : null}
        </div>
    );
}