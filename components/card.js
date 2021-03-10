import React from "react";
import Link from "next/link";
import Images from "./images";

const Card = ({ article }) => {
  return (
    <Link as={`/post/${article.slug}`} href="/post/[id]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <Images image={article.image} />
          </div>
          <div className="card__body">
            <p id="title" className="card__article__title">
              {article.title}
            </p>
            <p id="category" className="card__article__category">
              {article.category.name}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
