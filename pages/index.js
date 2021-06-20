import React from "react";
import Posts from "@/components/posts";
import Container from "@/components/container";
import Seo from "@/components/seo";
import { fetchAPI } from "@/lib/strapi/api";

const Home = ({ articles, categories, homepage }) => {
  console.log(articles);
  console.log(categories);
  console.log(homepage);
  return (
    <Container categories={categories}>
      <Seo seo={homepage.seo} />
      <div>
        <div className="homepage__container">
          <h1 className="homepage__title">{homepage.hero.title}</h1>
          <Posts articles={articles} />
        </div>
      </div>
    </Container>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

export default Home;
