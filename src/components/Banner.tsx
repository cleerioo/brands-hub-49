"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

function Banner() {
    return (
        <div className="relative">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div className="relative h-[600px] w-full">
                    <Image
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=2000"
                        alt="Minimalist Watch Banner"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className="relative h-[600px] w-full">
                    <Image
                        loading="lazy"
                        src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Rolex Banner"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="relative h-[600px] w-full">
                    <Image
                        loading="lazy"
                        src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=2000"
                        alt="Lifestyle Watch Banner"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </Carousel>
        </div>
    );
}

export default Banner;
