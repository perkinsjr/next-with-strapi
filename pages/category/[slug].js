import Posts from "@/components/posts";
import { fetchAPI } from "@/lib/strapi/api";
import Container from "@/components/container";
import Seo from "@/components/seo";

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <Container categories={categories}>
      <Seo seo={seo} />
      <div className="">
        <div className="">
          <h1>{category.name}</h1>
          <Posts articles={category.articles} />
        </div>
      </div>
    </Container>
  );
};

export async function getStaticPaths() {
  const postResults = await fetchGraphql(
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
    `query{
      categories{
        id
      }
    }
  `
  );
  const categories = await postResults.data.categories;
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = (await fetchAPI(`/categories?slug=${params.slug}`))[0];
  const categories = await fetchAPI("/categories");

  return {
    props: { category, categories },
    revalidate: 1,
  };
}

export default Category;
