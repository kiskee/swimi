import Link from "next/link";
import { useState, useEffect } from "react";
import { createLikes, deleteLikes } from "@/graphql/mutations";
import { API } from "aws-amplify";

function LikesBar({ post, userName }) {
  const [fill, setFill] = useState("#ffffff"); // Estado inicial
  const [liks, setLiks] = useState(null);
  const [likesNumber, setLikesNumber] = useState(post.Likes.items.length);
  const userNamesDeLikes = post.Likes.items.map((like) => like.userName);

  useEffect(() => {
    const likes = post.Likes.items;
    const likesFiltrados = likes.filter((like) => like.userName === userName);

    // Verificar si hay likes y actualizar el estado en consecuencia
    if (likesFiltrados.length > 0) {
      setFill("#4d7c0f");
      setLiks(likesFiltrados[0]);
    } else {
      setFill("#ffffff"); // Establecer el estado a su valor inicial si no hay likes
    }
  }, [post, userName]); // Dependencias del efecto: post y userName

  useEffect(() => {
    const init = async () => {
      const { Ripple, Tooltip, initTE } = await import("tw-elements");
      initTE({ Ripple, Tooltip });
    };
    init();
  }, []);

  async function saveLikes() {
    try {
      const newLikes = await API.graphql({
        query: createLikes,
        variables: {
          input: {
            userName: userName,
            todoID: post.id,
          },
        },
      });
      setFill("#4d7c0f");
      setLiks(newLikes.data.createLikes);
      setLikesNumber(likesNumber + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLike() {
    try {
      await API.graphql({
        query: deleteLikes,
        variables: { input: { id: liks.id } },
      });
      setFill("#ffffff");
      setLiks(null);
      setLikesNumber(likesNumber - 1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    if (liks) {
      deleteLike();
    } else {
      saveLikes();
    }
  };

  return (
    <span>
        <svg
          fill={fill}
          width="24px"
          height="24px"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={handleClick}
          data-te-toggle="tooltip"
          data-te-placement="top"
          data-te-ripple-init
          data-te-ripple-color="light"
          title={userNamesDeLikes}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M1863.059 1016.47c0-124.574-101.308-225.882-225.883-225.882H1203.37c-19.651 0-37.044-9.374-47.66-25.863-10.391-16.15-11.86-35.577-3.84-53.196 54.776-121.073 94.87-247.115 119.378-374.513 15.925-83.576-5.873-169.072-60.085-234.578C1157.29 37.384 1078.005 0 993.751 0H846.588v56.47c0 254.457-155.068 473.224-285.063 612.029-72.734 77.477-176.98 122.09-285.967 122.09H56v734.117C56 1742.682 233.318 1920 451.294 1920h960c124.574 0 225.882-101.308 225.882-225.882 0-46.42-14.117-89.676-38.174-125.59 87.869-30.947 151.116-114.862 151.116-213.234 0-46.419-14.118-89.675-38.174-125.59 87.868-30.946 151.115-114.862 151.115-213.233"
              fillRule="evenodd"
            ></path>{" "}
          </g>
        </svg>
        <p className="text-center text-indigo-400">{likesNumber}</p>
      </span>
  );
}

export default LikesBar;
