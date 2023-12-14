import React from "react";
import { useNewsQuery } from "../../../services/news";
import Blog from "../../../components/blog";
import "../../../assets/scss/page/news.scss";
import { useNavigate } from "react-router-dom";
const ListNews: React.FC = () => {
  const { data: dataNews } = useNewsQuery();
  console.log(dataNews);
  const navigate = useNavigate();
  const detailNews = (id:Number) => {
    navigate(`${id}`);
  };
  return (
    <>
      <div className="bg">
        <div className="news">
          {dataNews &&
            dataNews.map((item) => (
              <div
                onClick={() => {
                  detailNews(item.id);
                }}
                key={item.id}
              >
                <Blog
                  name={item.title}
                  description={item.description}
                  url={item.img}
                  date={item.created_at}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListNews;
