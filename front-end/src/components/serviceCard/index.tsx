import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type ServiceCardProps = {
  id: number;
  image: string;
  name: string;
};

const ServiceCard: FC<ServiceCardProps> = ({ id, name, image }) => {
  const navigate = useNavigate();
  console.log(id);

  return (
    <div
      className="home-listCate-item"
      onClick={() => navigate(`/appointment/${id}`)}
    >
      <div className="top">
        <img src={image} alt="" />
      </div>
      <div className="bottom">
        <button>{name}</button>
      </div>
    </div>
  );
};

export default ServiceCard;
