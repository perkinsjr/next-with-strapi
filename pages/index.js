import React from "react";
import Posts from "@/components/posts";
import Container from "@/components/container";
import { fetchGraphql } from "react-tinacms-strapi";

const Home = ({ articles, categories }) => {
  return (
    <Container categories={categories}>
      <div>
        <div className="homepage__container">
          <h1 className="homepage__title">Blog page</h1>
          <Posts articles={articles} />
        </div>
      </div>
    </Container>
  );
};

export async function getStaticProps({ preview, previewData }) {
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
     categories{
       name
       slug
       id
     }
    }
  `
  );
  if (preview) {
    return {
      props: {
        articles: postResults.data.articles,
        categories: postResults.data.categories,
        preview,
        ...previewData,
      },
    };
  }
  return {
    props: {
      articles: postResults.data.articles,
      categories: postResults.data.categories,
      preview: false,
    },
    revalidate: 1,
  };
}

export default Home;
