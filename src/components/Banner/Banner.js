import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Banner.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { handleClickBanner } from '../../Store';
export default function Banner() {
    const [listBanner, setListBanner] = useState([]);
    useEffect(() => {
        axios.get('/guest/getTop5Banner').then((res) => setListBanner(res.data));
    }, []);
    return (
        <>
            {listBanner.length < 3 ? (
                <div className="center">
                    <ColorRing
                        visible={true}
                        height="160"
                        width="160"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            ) : (
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={3000}
                    stopOnHover={false}
                    showStatus={false}
                    showThumbs={false}
                    showArrows={false}
                >
                    <div className='div-banner' onClick={() => handleClickBanner(listBanner[0].productId)}>
                        <img className="img-banner" src={listBanner[0].image} />
                    </div>
                    <div className='div-banner' onClick={() => handleClickBanner(listBanner[1].productId)}>
                        <img className="img-banner" src={listBanner[1].image} />
                    </div>
                    <div className='div-banner' onClick={() => handleClickBanner(listBanner[2].productId)}>
                        <img className="img-banner" src={listBanner[2].image} />
                    </div>
                </Carousel>
            )}
        </>
    );
}
