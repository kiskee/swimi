import { useEffect, useState, useRef } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { updateTodo } from "@/graphql/mutations";
import { getTodo } from "@/graphql/queries";
import { v4 as uuid } from "uuid";

function EditPost(){
    const [post, setPost] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const fileInput = useRef(null);
    const router = useRouter();
    const { id } = router.query;
    

    useEffect(() => {
        fetchPost();
        async function fetchPost() {
          if (!id) return;
          const postData = await API.graphql({
            query: getTodo,
            variables: { id },
          });
          setPost(postData.data.getTodo);
          if (postData.data.getTodo.image) {
            updateCoverImage(postData.data.getTodo.image);
          }
        }
      }, [id]);

     


      if (!post) return null;
      async function updateCoverImage(coverImage) {
        const imageKey = await Storage.get(coverImage);
        setCoverImage(imageKey);
      }

      async function uploadImage() {
        fileInput.current.click();
      }
    
      function handleChange(e) {
        const fileUpload = e.target.files[0];
        if (!fileUpload) return;
        setCoverImage(fileUpload);
        setLocalImage(URL.createObjectURL(fileUpload));
      }

      function onChange(e) {
        setPost(() => ({ ...post, [e.target.name]: e.target.value }));
      }
      const { name, description, category } = post;
      async function updateCurrentPost() {
        if (!name || !description) return;
        const postUpdated = {
          id,
          description,
          name,
          category
        };

        if (coverImage && localImage) {
          const fileName = `${coverImage.name}_${uuid()}`;
          postUpdated.image = fileName;
          await Storage.put(fileName, coverImage);
        }
        
        await API.graphql({
          query: updateTodo,
          variables: { input: postUpdated }
        });
        router.push("/");
      }



    return (
        <>
        <h1 className='text-3xl font-semibold tracking-wide mt-6 mb-2'>
        Editar post
      </h1>
      {coverImage && (
        <img className='mt-4' src={localImage ? localImage : coverImage} />
      )}
      <input
        onChange={onChange}
        name='name'
        placeholder='Title'
        value={post.name}
        className='border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2'
      />
      <SimpleMDE
        value={post.description}
        onChange={(value) => setPost({ ...post, description: value })}
      />
      <input
        type='file'
        ref={fileInput}
        className='absolute w-0 h-0'
        onChange={handleChange}
      />

      <button
        className='mb-4 bg-purple-600 text-white font-semibold px-8 py-2 rounded-lg'
        onClick={uploadImage}
      >
        Actualiza la imagen
      </button>
      <button
        className='mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg'
        onClick={updateCurrentPost}
      >
        Update Post
      </button>
        </>
    )
}

export default EditPost