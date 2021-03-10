import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "@/lib/strapi/api";
import Container from "@/components/container";
import Images from "@/components/images";
import Seo from "@/components/seo";
import { getStrapiMedia } from "@/lib/strapi/media";

const Post = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <Container categories={categories}>
      <Seo seo={seo} />
      <div data-src={imageUrl} data-srcset={imageUrl} data-uk-img>
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
    </Container>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}&status=published`
  );
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Post;
