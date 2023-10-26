import { FC } from "react";
import React from "react";
import Image from "../../assets/svg/icon";

type BlogProps = {
  name: string;
  description: string;
  url: string;
  date: string;
};

const Blog: FC<BlogProps> = ({ name, description, url, date }) => (
  <div className="blog">
    <div className="blog-image">
      <img src={url} alt="blogImage" />
      <div className="date">
        <div className="date-title">
          <Image />
          <p>{date}</p>
        </div>
      </div>
    </div>
    <div className="blog-name">{name}</div>
    <div className="blog-describe">{description}</div>
  </div>
);

export default Blog;
