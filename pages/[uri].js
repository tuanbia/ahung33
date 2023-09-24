import Head from 'next/head'
import Footer from '../components/Footer'
import { gql } from '@apollo/client';
import { client } from '../lib/apollo'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SlugPage({ post }) {
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra nếu có tham số fbclid trong URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('fbclid')) {
      // Thực hiện chuyển hướng đến URL mới
      const newUrl = `https://ziranews.com/${post.uri}`;
      router.push(newUrl);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="favicon.ico"></link>
        <meta property="og:image" content={post.featuredImage.node.sourceUrl}></meta>
      </Head>
      {/* Hiển thị nội dung của bài viết ở đây */}
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const GET_POST_BY_URI = gql`
    query GetPostByURI($id: ID!){
      post(id: $id, idType: URI){
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
      id: params.uri
    }
  });

  const post = response?.data?.post;

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const paths = []
  return {
    paths,
    fallback: 'blocking'
  }
}
