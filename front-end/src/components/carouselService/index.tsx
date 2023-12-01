import { FC, useRef } from "react";
import Carousel from "react-multi-carousel";
import ArrowLeft from "../../assets/svg/arrow-left";
import ArrowRight from "../../assets/svg/arrow-right";
import { responsive } from "../../page/base/home/data";
import ServiceCard from "../serviceCard";

type Props = {
  serviceData: any;
  name: string;
};

const CarouselSerivce: FC<Props> = ({ serviceData = [], name }) => {
  const carouselRef = useRef<Carousel | null>(null);
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next(1);
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(1);
    }
  };
  return (
    <div className="home-product">
      <Carousel
        className="carousel"
        responsive={responsive}
        customTransition="transform 500ms ease-in-out"
        containerClass="carousel-container"
        infinite={false}
        ref={carouselRef}
        showDots={true}
        draggable={false}
      >
        {serviceData?.map(
          (item: { id: number; name: string; image: string }) => (
            <ServiceCard key={item.id} name={item.name} image={item.image} />
          )
        )}
      </Carousel>
      <button className="home-product-prev button" onClick={handlePrev}>
        <ArrowLeft />
      </button>
      <button className="home-product-next button" onClick={handleNext}>
        <ArrowRight />
      </button>
      <div className="home-product-title">{name}</div>
    </div>
  );
};

export default CarouselSerivce;
