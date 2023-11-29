import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import Product from '../components/Product/Product';

export default function ListProductNear({ productId }) {
    const [listProduxt, setListProduct] = useState([]);
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
        axios.get(`/guest/getProductNearProduct/${productId}`).then((res) => setListProduct(res.data));
    }, []);
    return (
        <div>
            {listProduxt.length != 0 ? (
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
                    {listProduxt.map((product, index) => (
                        <Product key={product.productId} product={product} type={'sale'} />
                    ))}
                </Carousel>
            ) : null}
        </div>
    );
}
