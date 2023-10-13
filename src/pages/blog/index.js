import { useEffect, useState } from "react";
import { API, Storage, graphqlOperation } from "aws-amplify";
import Link from "next/link";
import { listTodos } from "@/graphql/queries";
import { newOnCreateTodo } from "@/graphql/subscriptions";
import ReactMarkDown from "react-markdown";
import { Auth } from "aws-amplify";
import LikesBar from "@/components/Likes/Likes";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);

  let subOncreate;

  function setUpSubscriptions() {
    subOncreate = API.graphql(graphqlOperation(newOnCreateTodo)).subscribe({
      next: (postData) => {
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

  useEffect(() => {
    async function getUser() {
      try {
        const resp = await Auth.currentAuthenticatedUser();
        //console.log(user)
        if (resp === "No current user") {
          // Si no hay usuario, puedes manejarlo aquí, por ejemplo, redirigir a la página de inicio de sesión.

          return;
        }
        setUser(resp.attributes);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

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

  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div className="container mt-4 mx-auto md:px-6">
        <section className="text-center md:text-left">
          <h2 className="mb-4 text-center text-4xl font-bold">
            Ultimos Articulos publicados
          </h2>

          {posts.map((post, index) => (
            <div
              className="mb-6 flex flex-wrap border rounded border-black mb-4 bg-indigo-950 pt-4"
              key={index}
            >
              <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-4/12">
                <div
                  className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat  dark:shadow-black/20"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <img src={post.image} className="w-full" alt="Louvre" />
                  <Link href={`/blog/${post.id}`}>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
                  </Link>
                </div>
              </div>

              <div className="mb-6 mr-auto px-3 md:mb-0 md:w-8/12 xl:w-7/12">
                <div className="flex justify-between">
                  <Link href={`/blog/${post.id}`}>
                    <h5 className="mb-3 text-xl font-bold text-white">
                      {post.name}
                    </h5>
                  </Link>
                  {user && <LikesBar post={post} userName={user.name} />}
                </div>
                <div className="mb-3 flex items-center justify-center text-sm font-medium text-green-500 dark:text-danger-500 md:justify-start">
                  {post.category}
                </div>
                <p className="mb-6 text-white">
                  <small>
                    Publicado:{" "}
                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                    <p className="">Por: Sergio Valiente Gomez</p>
                    {post.Comments.items.length > 0 ? (
                      <div>{post.Comments.items.length} Comentarios</div>
                    ) : (
                      <div>No hay Comentarios Aun</div>
                    )}
                  </small>
                </p>
                <span className="text-indigo-200 pb-4">
                  <ReactMarkDown>
                    {post.description.charAt(0).toUpperCase() +
                      post.description.slice(1).substr(0, 150) +
                      "..."}
                  </ReactMarkDown>
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default BlogPage;
