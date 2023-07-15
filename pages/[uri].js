import Head from 'next/head'
import Footer from '../components/Footer'
import { getPostByUri } from '../lib/test-data';
import {gql} from '@apollo/client';
import { client} from '../lib/apollo'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function SlugPage({ post }) {
  useEffect(() => {
    window.location.href = `https://ziranews.com/${post.uri}`;
  }, []);
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="favicon.ico"></link>
        <meta property="og:image" content={post.featuredImage.node.sourceUrl}></meta>

      </Head>

    </div>
  )
}

export async function getStaticProps({ params }){
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
      author{
        node{
          firstName
          lastName
        }
      }
    }
  }
  `
  const response = await client.query({
    query: GET_POST_BY_URI,
    variables: {
      id: params.uri
    }
  })
  const post = response?.data?.post
  return {
    props:{
      post
    }
  }
}

export async function getStaticPaths(){
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}


