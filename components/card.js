import React from "react";
import Link from "next/link";
import Images from "./images";

const Card = ({ article }) => {
  console.log(article.category);
  return (
    <Link as={`/post/${article.slug}`} href="/post/[id]">
      <a className="">
        <div className="">
          <div className="">
            <Images image={article.image} />
          </div>
          <div className="card__body">
            <p id="title" className="card__article__title">
              {article.title}
            </p>
            <p id="category" className="card__article__category">
              {article.category && article.category.name}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
