import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Product from '../components/Product/Product';

export default function ListProductSale() {
    const [listProductSale, setListProductSale] = useState([]);
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
    useEffect(() => {
        axios.get('/guest/getProductByDiscountNotNull').then((res) => setListProductSale(res.data));
    }, []);
    return (
        <div className="carousel-product-sale">
            {listProductSale.length != 0 ? (
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
                    {listProductSale.map((product) => (
                        <Product key={product.productId} product={product} type={'sale'} />
                    ))}
                </Carousel>
            ) : null}
        </div>
    );
}
