import { createComments, deleteTodo } from "@/graphql/mutations";
import { getTodo, listTodos } from "@/graphql/queries";
import { API, Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkDown from "react-markdown";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Link from "next/link";

const intialState = { description: "" };

function SinglePostPage({ post }) {
  const [coverImage, setCoverImage] = useState(null);
  const [comment, setComment] = useState(intialState);
  const [showMe, setShowMe] = useState(false);
  const router = useRouter();
  const [user, setuser] = useState(null);
  const [admin, setAdmin] = useState(null);
  //const { message } = comment;
  console.log(post);
  useEffect(() => {
    updateCoverImage();
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
    async function getUser() {
      try {
        const resp = await Auth.currentSession();
        if (resp === "No current user") {
          return;
        }
        const userGroups = resp?.idToken.payload["cognito:groups"];
        if (userGroups && userGroups.length > 0) {
          setAdmin(userGroups[0]);
        }
        setuser(resp.idToken.payload.name);
      } catch (error) {
        console.error("Error al obtener la sesión:", error);
      }
    }

    getUser();
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  function toggle() {
    setShowMe(!showMe);
  }

  async function updateCoverImage() {
    if (post.image) {
      const imageKey = await Storage.get(post.image);
      setCoverImage(imageKey);
    }
  }

  async function createTheComment() {
    if (!comment) return;
    try {
      //console.log(comment)
      const userToComment = user;
      comment.userName = userToComment;

      await API.graphql({
        query: createComments,
        variables: { input: comment },
      });
    } catch (error) {
      console.log(error);
    }
    router.push("/blog");
  }

  /*
  async function getUser() {
    try {
      const resp = await Auth.currentSession();
      if (resp == "No current user") return;
      setAdmin(resp?.idToken.payload["cognito:groups"]?.[0]);
      setuser(resp.idToken.payload.name);
    } catch (error) {
      
    }
  }
*/
  async function deletePost(id) {
    await API.graphql({
      query: deleteTodo,
      variables: { input: { id } },
    });
    router.push("/blog");
  }

  console.log(admin)
  return (
    <>
      <h1 className="text-5xl mt-4 mb-4 font-semibold tracing-wide">
        {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
      </h1>
      {coverImage && <img src={coverImage} className="mt4" />}
      <p className="text-sm font-light my-4">Por: Sergio Valiente Gomez</p>
      <div className="mt-8">
        <ReactMarkDown children={post.description} />
      </div>
      <div>
        {post.Comments.items.length > 0 &&
          post.Comments.items.map((comment, index) => (
            <div
              key={index}
              className="py-8 px-8 max-w-xl mx-auto bg-white rounded-xl 
                    shadow-lg space-y-2 sm:py-1 sm:flex 
                    my-6
                    mx-12
                    sm:items-center sm:space-y-0 sm:space-x-6 mb-2
                    "
            >
              <div>
                <p className="text-gray-500 mt-2">{comment.description}</p>
                <p className="text-red-400 mt-1">{comment.userName}</p>
                <p className="text-slate-950 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString("es-ES", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        {user ? (
          <>
            <button
              type="button"
              className="mb-4 bg-green-600 
        text-white font-semibold px-8 py-2 rounded-lg mt-8"
              onClick={toggle}
            >
              Escribe un comentario
            </button>
            {admin && (
            <>
            <button
              type="button"
              class="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] ml-4"
              data-te-toggle="modal"
              data-te-target="#exampleModal"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Borrar Post
            </button>
            <Link
              href={`/edit-post/${post.id}`}
              type="button"
              class="inline-block rounded bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] ml-4"
            >
              Actualizar Post
            </Link>
            </>
            )}
            
            <div
              data-te-modal-init
              class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                data-te-modal-dialog-ref
                class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
              >
                <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                  <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <h5
                      class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                      id="exampleModalLabel"
                    >
                      Estas Seguro???
                    </h5>

                    <button
                      type="button"
                      class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      data-te-modal-dismiss
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="relative flex-auto p-4" data-te-modal-body-ref>
                    Borrar el post:{" "}
                    <span className="text-red-500">{post.name}</span>
                  </div>

                  <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <button
                      type="button"
                      class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      data-te-modal-dismiss
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      class="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] ml-4"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      data-te-modal-dismiss
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      BORRAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button
            className="mb-4 bg-green-600 
      text-white font-semibold px-8 py-2 rounded-lg mt-8"
          >
            Ingresa para Comentar
          </button>
        )}

        {
          <div style={{ display: showMe ? "block" : "none" }}>
            <SimpleMDE
              value={comment.description}
              onChange={(value) =>
                setComment({ ...comment, description: value, todoID: post.id })
              }
            />
            <button
              onClick={createTheComment}
              type="button"
              className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        }
      </div>
    </>
  );
}

export default SinglePostPage;

export async function getStaticPaths() {
  const postData = await API.graphql({
    query: listTodos,
  });
  const paths = postData.data.listTodos.items.map((post) => ({
    params: { id: post.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const postData = await API.graphql({
    query: getTodo,
    variables: { id },
  });

  return {
    props: {
      post: postData.data.getTodo,
    },
    revalidate: 1,
  };
}
