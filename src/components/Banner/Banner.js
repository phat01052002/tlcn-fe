import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Banner.css'
export default function Banner() {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} interval={3000} stopOnHover={false} showStatus={false} showThumbs={false} showArrows={false}>
            <div>
                <img className='img-banner' src="https://nhaxinh.com/wp-content/uploads/2022/01/sofa-maxine-vai-vang-2.jpg" />
            </div>
            <div>
                <img className='img-banner' src="https://nhaxinh.com/wp-content/uploads/2021/10/nha-xinh-phong-khach-sofa-jazz-mau-cognac-phong-cach.jpg" />
            </div>
            <div>
                <img className='img-banner' src="https://nhaxinh.com/wp-content/uploads/2022/05/phong-ngu-hien-dai-thanh-lich-skagen-13522.jpg" />
            </div>
        </Carousel>
    );
}
