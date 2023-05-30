import { GetStaticPaths } from 'next';

export default function Page() {
  return <div>My Post</div>;
}

export async function getAllPostIds() {
  const res = await fetch(`http://127.0.0.1:8000/user/`);
  const posts = await res.json();
  return posts.map((post: any) => {
      return {
          params: {
              id: String(post.userId)
          }
      }
  })
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false
  }
};
