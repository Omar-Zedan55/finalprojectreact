import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/slider-image-1.jpeg"
import slider2 from "./../../assets/slider-image-2.jpeg"
import slider3 from "./../../assets/slider-image-3.jpeg"
import sliderfixed1 from "./../../assets/blog-img-1.jpeg"
import sliderfixed2 from "./../../assets/blog-img-2.jpeg"
export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        arrows:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <section className=" pb-5">
            <div className="flex justify-center items-center">
                <div className="w-2/3">
                    <Slider {...settings}>
                        <div>
                            <img className="h-[400px] w-full" src={slider1} alt="slider1" />
                        </div>
                        <div>
                            <img className="h-[400px] w-full" src={slider2} alt="slider2" />
                        </div>
                        <div>
                            <img className="h-[400px] w-full" src={slider3} alt="slider3" />
                        </div>
                    </Slider>
                </div>
                <div className="w-1/3">
                    <div>
                        <img className=" w-full h-[200px]" src={sliderfixed1} alt="" />
                    </div>
                    <div>
                        <img className=" w-full h-[200px]" src={sliderfixed2} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

