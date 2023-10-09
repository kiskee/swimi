import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { createTodo } from "@/graphql/mutations";

const initialState = { name: "", description: "", category: "General" };

function CreatePost() {
  const [post, setPost] = useState(initialState);
  const { name, description, category } = post;
  const router = useRouter();
  const [image, setImage] = useState(null);
  const imageFileInput = useRef(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const resp = await Auth.currentSession();
        if (resp === "No current user") {
          // Si no hay usuario, puedes manejarlo aquí, por ejemplo, redirigir a la página de inicio de sesión.
          return;
        }
        const userGroups = resp?.idToken.payload["cognito:groups"];
        if (userGroups && userGroups.length > 0) {
          // Establecer el primer grupo como admin
          setAdmin(userGroups[0]);
        } else {
          // Si el usuario no tiene ningún grupo, no es admin
          setAdmin(null);
        }
      } catch (error) {
        // Manejar errores aquí si es necesario
      }
    }

    getUser();
  }, []);

  function onChange(e) {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNewPost() {
    if (!name || !description) return;
    //const id = uuid();
    //post.id = id;
    if (image) {
      const filename = `${image.name}_${uuid()}`;
      post.image = filename;
      await Storage.put(filename, image);
    }

    const newPost = await API.graphql({
      query: createTodo,
      variables: {
        input: post,
      },
    });

    router.push(`/blog/${newPost.data.createTodo.id}`);
    //router.push(`/blog`);
  }
  async function uploadImage() {
    imageFileInput.current.click();
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
  }

  /*
  async function getUser() {
    try {
      const resp = await Auth.currentSession();
      if (resp == "No current user") return;
      setAdmin(resp?.idToken.payload["cognito:groups"]?.[0]);
    } catch (error) {}
  }
  

  if (admin != "admin") {
    router.push("/blog");
    return null;
  }
*/
if (admin === undefined) {
  return null;
}
  return (
    <>
    {admin ? (<>
      <h1 className="text-4xl">Nuevo Post </h1>
      <input
        onChange={onChange}
        name="name"
        placeholder="Titulo"
        value={post.name}
        className="border-b pb-2 text-lg my-4
         focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <label className="leading-loose text-2xl">
        Selecciona una categoria:
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-6"
        onChange={onChange}
        name="category"
      >
        <option defaultValue>General</option>
        <option value="Metodologia Enseñanza">Metodologia Enseñanza</option>
        <option value="Enseñanza por Niveles">Enseñanza por Niveles</option>
        <option value="Programas de Entrenamiento">
          Programas de Entrenamiento
        </option>
        <option value="Entrenamiento Infantiles">
          Entrenamiento Infantiles
        </option>
        <option value="Entrenamiento Juveniles">Entrenamiento Juveniles</option>
        <option value="Metodología del Entrenamiento">
          Metodología del Entrenamiento
        </option>
        <option value="Desarrollo de Capacidades">
          Desarrollo de Capacidades
        </option>
        <option value="Progresos">Progresos</option>
        <option value="Pronosticos">Pronosticos</option>
      </select>
      {image && <img src={URL.createObjectURL(image)} className="my-4" alt="create-image"/>}
      <SimpleMDE
        value={post.description}
        onChange={(value) => setPost({ ...post, description: value })}
      />
      <input
        type="file"
        ref={imageFileInput}
        className="absolute w-0 h-0"
        onChange={handleChange}
      />
      <button
        type="button"
        className="bg-green-600 text-white 
        font-semibold px-8 py-2 rounded-lg mr-2"
        onClick={uploadImage}
      >
        Imagen del Post
      </button>
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white 
     font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >
        Crear Nuevo Post
      </button>{" "}
    </>) : (<>
     <p className="mt-8">No tienes permisos de administrador.</p>
     <button
        type="button"
        className="mb-4 bg-blue-600 text-white 
     font-semibold px-8 py-2 rounded-lg"
        onClick={()=>{router.push("/blog")}}
      >
        Inicio
      </button>{" "}
    </>)}
      
    </>
  );
}

export default withAuthenticator(CreatePost);
