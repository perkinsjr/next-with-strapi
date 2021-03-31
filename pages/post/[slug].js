import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Images from "@/components/images";
import markdownToHtml from "@/lib/markdownToHtml";
const Post = ({ article }) => {
  console.log(article);
  return (
    <>
      <div>
        <h1>{article.title}</h1>
      </div>
      <div>
        <div>
          <ReactMarkdown source={article.content} escapeHtml={false} />
          <div>
            <div>
              {article.author.picture && (
                <Images
                  image={article.author.picture}
                  style={{
                    position: "static",
                    borderRadius: "50%",
                    height: 30,
                  }}
                />
              )}
            </div>
            <div>
              <p>By {article.author.name}</p>
              <p>
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { fetchGraphql } from "react-tinacms-strapi";
// ...
export async function getStaticProps({ params }) {
  const postResults = await fetchGraphql(
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
    `query{
      articles(where: {slug: "${params.slug}"}){
        id
        title
        publishedAt
        slug
        content
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
  console.log(postResults);
  const post = await postResults.data.articles[0];
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      article: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const postResults = await fetchGraphql(
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
    `
    query{
      articles{
        slug
      }
    }
  `
  );

  return {
    paths: postResults.data.articles.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
