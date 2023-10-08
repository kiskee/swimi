import { useEffect, useState } from "react";
import { API, Storage, graphqlOperation } from "aws-amplify";
import Link from "next/link";
import { listTodos } from "@/graphql/queries";
import { newOnCreateTodo } from "@/graphql/subscriptions";
import svgPhoto from '../../../public/sergio-1.png'
import Image from "next/image";
import ReactMarkDown from "react-markdown";


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



        ////////////////////////////////////////////////////////////////////////
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
              <p className="font-bold">
                {new Date(post.createdAt).toLocaleDateString("es-ES", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="text-purple-800 font-bold">3 MIN DE LECTURA</p>
              <span class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-indigo-900 text-white">
                {post.category}
              </span>
            </div>

            <Link href={`/blog/${post.id}`}>
              <h2 className="text-3xl font-bold">{post.name}</h2>
            </Link>
          
            <p>
            <ReactMarkDown >{post.description.charAt(0).toUpperCase() +
                post.description.slice(1).substr(0, 150) +
                "..."}</ReactMarkDown>
              
            </p>
            <div className="flex items-center space-x-2">
              <Image
                className="w-8 h-10  rounded-full bg-contain bg-center"
                src={svgPhoto}
                alt="sergio"
              />
              <div className="font-medium text-black">
                <div>Sergio Valiente Gomez</div>
              </div>
              {post.Comments.items.length > 0 ? <div>{post.Comments.items.length} Comentarios</div>  : <div>No hay Comentarios Aun</div>}
             
            </div>
          </div>
        </div>
        
      ))}
  */
console.log(posts)
  return (
    <>
    <div class="container mt-24 mx-auto md:px-6">
      <section class="text-center md:text-left">
        <h2 class="mb-12 text-center text-4xl font-bold">Ultimos Articulos publicados</h2>

        {posts.map((post, index) => (
            <div class="mb-6 flex flex-wrap border rounded border-black mb-4 bg-indigo-950 pt-4" key={index}>
            <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-4/12">
              <div
                class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat  dark:shadow-black/20"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                
                <img
                  src={post.image}
                  class="w-full"
                  alt="Louvre"
                />
                <Link href={`/blog/${post.id}`}>
                  <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
                </Link>
              </div>
            </div>

            <div class="mb-6 mr-auto px-3 md:mb-0 md:w-8/12 xl:w-7/12">
              <h5 class="mb-3 text-xl font-bold text-white">{post.name}</h5>
              <div class="mb-3 flex items-center justify-center text-sm font-medium text-green-500 dark:text-danger-500 md:justify-start">
                {post.category}
              </div>
              <p class="mb-6 text-white">
                <small>
                  Publicado:  {new Date(post.createdAt).toLocaleDateString("es-ES", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}  
                  <p className="">Por: Sergio Valiente Gomez</p>
                  {post.Comments.items.length > 0 ? <div>{post.Comments.items.length} Comentarios</div>  : <div>No hay Comentarios Aun</div>}
           
                </small>
              </p>
              <p class="text-indigo-200 pb-4">
              <ReactMarkDown >{post.description.charAt(0).toUpperCase() +
              post.description.slice(1).substr(0, 150) +
              "..."}</ReactMarkDown>
              </p>
            </div>
          </div>

        ))}

        
      </section>
    </div>
  </>
  );
}

export default BlogPage;
