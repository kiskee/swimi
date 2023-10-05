import { useEffect, useState } from "react";
import { API, Storage, graphqlOperation } from "aws-amplify";
import Link from "next/link";
import { listTodos } from "@/graphql/queries";
import { newOnCreateTodo } from "@/graphql/subscriptions";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);

  let subOncreate;

  function setUpSubscriptions() {
    subOncreate = API.graphql(graphqlOperation(newOnCreateTodo)).subscribe({
      next: (postData) => {
        //console.log(postData.value);
        setPost(postData);
      },
    });
  }
  useEffect(() => {
    setUpSubscriptions();
    return () => {
      subOncreate.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [post]);

  async function fetchPosts() {
    const postsData = await API.graphql({
      query: listTodos,
    });
    const { items } = postsData.data.listTodos;
    const postWithImages = await Promise.all(
      items.map(async (post) => {
        if (post.image) {
          post.image = await Storage.get(post.image);
        }
        return post;
      })
    );
    setPosts(postWithImages);
  }

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-8">Posts</h1>
      {posts.map((post, index) => (
        <Link key={index} href={`/blog/${post.id}`}>
          <div className="cursor-pointer mt-2 pt-4 border-b border-gray-300">
            {post.image && (
              <img
                src={post.image}
                className="w-36 h-36 bg-contain bg-center 
                 rounded-full sm:mx-0 sm:shrink-0"
              />
            )}
            <h2 className="text-xl font-semibold" key={index}>
              {post.name}
            </h2>
            <p className="text-gray-500 mt-2">Author: Sergio Valiente Gomez</p>
          </div>
          {post.Comments.items.length > 0 &&
            post.Comments.items.map((comment, index) => (
              <div
                key={index}
                className="py-8 px-8 max-w-xl mx-auto bg-white rounded-xl 
                    shadow-lg space-y-2 sm:py-1 sm:flex 
                    my-6
                    mx-12
                    sm:items-center sm:space-y-0 sm:space-x-6 mb-2"
              >
                <div>
                  <p className="text-gray-500 mt-2">{comment.description}</p>
                  <p className="text-red-400 mt-1">{comment.userName}</p>
                  <p className="text-slate-950 mt-1">{comment.createdAt}</p>
                </div>
              </div>
            ))}
        </Link>
      ))}
    </>
  );
}

export default BlogPage;
