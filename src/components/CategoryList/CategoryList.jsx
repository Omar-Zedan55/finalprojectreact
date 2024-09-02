import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function CategoryList() {
    async function getCategory() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }
    const { data } = useQuery("getCategories", getCategory);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (<>
        <section className="p-5 overflow-x-hidden overflow-y-hidden mt-14">
            <Slider {...settings}>
                {data?.data.data ? data?.data.data.map((item, idx) => {
                    return <div key={idx} ><div className="h-[250px]">
                        <img className="  h-full object-cover object-center w-full" src={item.image} alt="" />
                        <h2 className="font-semibold text-2xl">{item.name}</h2></div>
                    </div>
                }) : ""}
            </Slider>
        </section> 
    </>
    );
}