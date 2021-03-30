import React from "react";
import Posts from "@/components/posts";
import Container from "@/components/container";
import { fetchGraphql } from "react-tinacms-strapi";

const Home = ({ articles }) => {
  console.log(JSON.stringify(articles));
  return (
    <div>
      <div className="homepage__container">
        <h1 className="homepage__title">Blog page</h1>
        <Posts articles={articles} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const postResults = await fetchGraphql(
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
    `
    query{
         articles {
           title
           publishedAt
           slug
           category{
             name
           }
           author {
             name
             picture {
               url
             }
           }
           image {
             url
           }
         }
       }
  `
  );
  return {
    props: { articles: postResults.data.articles },
    revalidate: 1,
  };
}

export default Home;
