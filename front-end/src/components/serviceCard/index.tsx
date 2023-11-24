import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type ServiceCardProps = {
  id: number;
  image: string;
  name: string;
};

const ServiceCard: FC<ServiceCardProps> = ({ id, name, image }) => {
  const navigate = useNavigate();
  return (
    <div
      className="home-listCate-item"
      onClick={() =>
        navigate(`/appointment`, {
          state: {
            appointmentData: {
              pets: [],
              services: [{ id, name }],
              type: 1,
            },
          },
        })
      }
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
