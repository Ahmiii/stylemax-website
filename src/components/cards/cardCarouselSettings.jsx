import { SampleNextArrow } from '../common/slickCarouselArrows';
import { SamplePrevArrow } from '../common/slickCarouselArrows';

export const settings = {
  dots: false,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 3300,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 2.5,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1.5,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
