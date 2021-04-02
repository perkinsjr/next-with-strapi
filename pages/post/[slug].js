import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Images from "@/components/images";
import Container from "@/components/container";
import { InlineWysiwyg } from "react-tinacms-editor";
import { fetchGraphql } from "react-tinacms-strapi";
import { useForm, usePlugin, useCMS } from "tinacms";
import { InlineForm, InlineText, InlineImage } from "react-tinacms-inline";

const Post = ({ post: initialPost, preview, categories }) => {
  const cms = useCMS();
  const formConfig = {
    id: initialPost.id,
    label: "Blog Post",
    initialValues: initialPost,
    onSubmit: async (values) => {
      const saveMutation = `
      mutation UpdateArticleMutation(
        $id: ID!
        $title: String
        $content: String
        $coverImageId: ID
      ) {
        updateArticle(
          input: {
            where: { id: $id }
            data: { title: $title, content: $content, image: $coverImageId}
          }
        ) {
          article {
            id
          }
        }
      }`;
      const response = await cms.api.strapi.fetchGraphql(saveMutation, {
        id: values.id,
        title: values.title,
        content: values.content,
        coverImageId: values.image.id,
      });
      if (response.data) {
        cms.alerts.success("Changes Saved");
      } else {
        cms.alerts.error("Error saving changes");
      }
    },
    fields: [],
  };
  const [post, form] = useForm(formConfig);
  usePlugin(form);

  return (
    <div preview={{ preview }}>
      <InlineForm form={form} initialStatus={"active"}>
        <Container categories={categories}>
          <div>
            <InlineImage
              name="image.id"
              uploadDir={() => "/"}
              parse={(media) => media.id}
            >
              {() => (
                <img
                  src={post.image.url}
                  alt={`Cover Image for ${post.title}`}
                />
              )}
            </InlineImage>
            <h1>
              {" "}
              <InlineText name="title" />
            </h1>
          </div>
          <div>
            <div>
              <InlineWysiwyg name="content" format="markdown">
                <ReactMarkdown source={post.content} />
              </InlineWysiwyg>
              <div>
                <div>
                  {post.author.picture && (
                    <Images
                      image={post.author.picture}
                      style={{
                        position: "static",
                        borderRadius: "50%",
                        height: 30,
                      }}
                    />
                  )}
                </div>
                <div>
                  <p>By {post.author.name}</p>
                  <p>
                    <Moment format="MMM Do YYYY">{post.published_at}</Moment>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </InlineForm>
    </div>
  );
};

// ...
export async function getStaticProps({ params, preview, previewData }) {
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
      categories{
        name
        slug
        id
      }
    }
  `
  );
  const post = await postResults.data.articles[0];
  const categories = await postResults.data.categories;
  if (preview) {
    return {
      props: {
        post: {
          ...post,
        },
        categories: categories,
        preview,
        ...previewData,
      },
    };
  }

  return {
    props: {
      post: {
        ...post,
      },
      categories: categories,
      preview: false,
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
