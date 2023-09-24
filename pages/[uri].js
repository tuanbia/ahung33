import Head from 'next/head';
import Footer from '../components/Footer';
import { getPostByUri } from '../lib/test-data';
import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SlugPage({ post }) {
  const router = useRouter();

  useEffect(() => {
    // Lấy giá trị fbclid từ query string
    const fbclid = router.query.fbclid;

    // Nếu fbclid tồn tại, thực hiện chuyển hướng
    if (fbclid) {
      // Tạo URL mới bằng cách thêm fbclid vào URL hiện tại
      const newURL = `https://bestpetlove.net/${post.uri}?fbclid=${fbclid}`;

      // Chuyển hướng đến URL mới
      window.location.href = newURL;
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="favicon.ico" />
        <meta property="og:image" content={post.featuredImage.node.sourceUrl} />
      </Head>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const GET_POST_BY_URI = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        date
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            firstName
            lastName
          }
        }
      }
    }
  `;

  const response = await client.query({
    query: GET_POST_BY_URI,
    variables: {
      id: params.uri,
    },
  });

  const post = response?.data?.post;

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: 'blocking',
  };
}
