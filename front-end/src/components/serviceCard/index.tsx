import React, {FC} from 'react'

type ServiceCardProps = {
  image: string,
  name: string
}

const ServiceCard: FC<ServiceCardProps> = ({name,image}) => {
  return (
    <div className="home-listCate-item">
    <div className="top">
      <img src={image} alt="" />
    </div>
    <div className="bottom">
      <button>{name}</button>
    </div>
  </div>
  )
}

export default ServiceCard