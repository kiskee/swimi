

import {  Auth } from 'aws-amplify';
import { listTodos } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { API, Storage} from "aws-amplify";
import ReactMarkDown from "react-markdown";
import Link from 'next/link';

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
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
      postWithImages.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      const finalPostToShow = postWithImages.slice(0, 3);
      setPosts(finalPostToShow);
    }
    fetchPosts();
  }, []);

  
  console.log(posts);
  return (
    <>
    <div class="bg-neutral-50 py-24 px-6 text-center dark:bg-neutral-900 mt-8 rounded shadow-lg">
          <h1 class="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
          Con el AVAL de <br /><span class="text-primary">Acuatica Nelson Vargas</span>
          </h1>
          <a class="mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
            data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Empezemos</a>
          <Link class="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-800 dark:hover:bg-opacity-60"
            data-te-ripple-init data-te-ripple-color="light" href="/about" role="button">Conoceme</Link>
        </div>
        <div class="container my-8 mx-auto md:px-6">

<section class="text-center lg:text-left">
  <h2 class="mb-12 text-center text-3xl font-bold">
    Ultimos post publicados
  </h2>

  <div class="grid gap-x-6 lg:grid-cols-3 lg:gap-x-12">
    {posts.map((post, index)=>(
      <div class="mb-6 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 lg:mb-0" data-te-ripple-init data-te-ripple-color="light" key={index}>
      <div class="relative overflow-hidden bg-cover bg-no-repeat">
        <img src={post.image} class="w-full rounded-t-lg" />
        
        <svg class="absolute left-0 bottom-0 text-white dark:text-neutral-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
      <div class="p-6">
        <h5 class="mb-4 text-lg font-bold">{post.name}</h5>
        <p class="mb-6">
        <ReactMarkDown >{post.description.charAt(0).toUpperCase() +
              post.description.slice(1).substr(0, 150) +
              "..."}</ReactMarkDown>
        </p>
        <Link href={`/blog/${post.id}`} data-te-ripple-init data-te-ripple-color="light"
          class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Leer Mas</Link>
      </div>
    </div>

    ))}


    
  </div>
</section>
</div>
    </>
  )
}

export default Home;