import { createComments } from "@/graphql/mutations";
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

  async function getUser() {
    try {
      const resp = await Auth.currentSession();
      if (resp == "No current user") return;
      setAdmin(resp?.idToken.payload["cognito:groups"]?.[0]);
      setuser(resp.idToken.payload.name);
    } catch (error) {
      //console.log(error);
    }
  }
  //console.log(comment)
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
                <p className="text-slate-950 mt-1">{comment.createdAt}</p>
              </div>
            </div>
          ))}
        {user ? (
          <button
            type="button"
            className="mb-4 bg-green-600 
        text-white font-semibold px-8 py-2 rounded-lg mt-8"
            onClick={toggle}
          >
            Escribe un comentario
          </button>
        ) : (
          <button
            type="button"
            className="mb-4 bg-green-600 
      text-white font-semibold px-8 py-2 rounded-lg mt-8"
            onClick={toggle}
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
