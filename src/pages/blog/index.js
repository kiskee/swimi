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

  /*
  <div class="m-4 flex border border-gray-200 p-2">
  <div>
    <img class="h-auto max-w-md" src="https://assets.website-files.com/6231c31a6f6b11d3790a8978/64eca5511eeb95927291b31e_Psychological%20Safety%20Roadmap%20Blog.png" alt=title />
  </div>
  <div class="pl-4 flex-row content-between">
    <p class="font-bold">JUNE 20, 2023</p>
  <p class="text-gray-400 font-bold">3 MIN READ</p>
  <h2 class="text-3xl font-bold">Recognizing and rewarding employees in a challenging economic environment</h2>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
  <p class="font-bold">by pando</p>
  </div>
</div>


//////////////////////////////////////////////////////////////////
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
  */

  return (
    <>
      <h1 className="text-6xl font-semibold tracking-wide mt-6 mb-8 text-center text-indigo-950">
        LOS ARTÍCULOS MÁS RECIENTES.
      </h1>
      {posts.map((post, index) => (
        <div
          className="m-4 flex  p-2 border-2 border-indigo-950 bg-indigo-200 rounded"
          key={index}
        >
          <div>
            <Link href={`/blog/${post.id}`}>
              <img
                src={post.image}
                className="w-90 h-80 bg-contain bg-center"
                alt="post-image"
              />
            </Link>
          </div>
          <div className="pl-4 flex-col grid content-between p-4">
            <div className="flex gap-8">
              <p className="font-bold">{new Date(post.createdAt).toLocaleDateString("es-ES", { month: "long", day: "2-digit", year: "numeric" })}</p>
              <p className="text-purple-800 font-bold">3 MIN READ</p>
            </div>
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-3xl font-bold">{post.name}</h2>
            </Link>

            <p>
              {post.description.charAt(0).toUpperCase() +
                post.description.slice(1).substr(0, 150) +
                "..."}
            </p>
            <p className="font-bold">Por: Sergio Valiente Gomez</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default BlogPage;
