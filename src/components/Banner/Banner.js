import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Banner.css';
export default function Banner() {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            stopOnHover={false}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
        >
            <div>
                <img
                    className="img-banner"
                    src="https://theme.hstatic.net/200000796751/1001150659/14/slide_1_img.jpg?v=482"
                />
            </div>
            <div>
                <img
                    className="img-banner"
                    src="https://theme.hstatic.net/200000796751/1001150659/14/slide_2_img.jpg?v=482"
                />
            </div>
            <div>
                <img
                    className="img-banner"
                    src="https://theme.hstatic.net/200000796751/1001150659/14/slide_2_img.jpg?v=482"
                />
            </div>
        </Carousel>
    );
}
