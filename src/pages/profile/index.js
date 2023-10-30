import { Authenticator } from "@aws-amplify/ui-react";
import { Auth, Hub } from "aws-amplify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import svgLogo from "../../../public/final.png";
import Image from "next/image";
import "@aws-amplify/ui-react/styles.css";
import { Link } from "@aws-amplify/ui-react";
import { listModuleOnes } from "@/graphql/queries";
import { API } from "aws-amplify";

const components = {
  Header() {
    return (
      <div className="items-center mb-4 ">
        <Image alt="svgnatacion-logo" src={svgLogo} height={200} width={200} />
      </div>
    );
  },
};

function Profile() {
  const [signedInUser, setSignedInUser] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [trasn, setTrasn] = useState(null);

  const [userData, setUserData] = useState({
    address: "",
    birthdate: "",
    gender: "",
    phone_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    authListener();
  }, [signedInUser]);

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedInUser(true);
        case "signOut":
          setSignedInUser(false);
          setAdmin("");
          break;
      }
    });
    try {
      const user = await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
      if (user) {
        //console.log(user.attributes)
        const allModuleOnes = await API.graphql({
          query: listModuleOnes,
        });
        const existingTransaction =
          allModuleOnes.data.listModuleOnes.items.filter(
            (item) => item.userPoolId === user.attributes.sub
          );
        //console.log(existingTransaction[0])
        setTrasn(existingTransaction[0]);
      }
      //console.log(user.attributes.sub)
      //checkModules(user.attributes.sub)
      //console.log(trasn)
      setUser(user);
    } catch (err) {}
  }

  async function logOut() {
    try {
      const outUser = await Auth.signOut();
      //router.push(`/`);
    } catch (error) {}
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const resp = await Auth.updateUserAttributes(user, userData);
    router.reload();
  }

  if (!user)
    return (
      <Authenticator
        signUpAttributes={["birthdate", "email", "gender", "name"]}
        className="mt-12"
        components={components}
      />
    );
  return (
    <Authenticator
      signUpAttributes={["birthdate", "email", "gender", "name"]}
      className="mt-12"
      components={components}
    >
      <>
        <h1 className="text-center text-indigo-950 text-4xl font-bold my-4">
          Perfil
        </h1>
        <div className="flex justify-center">
          {trasn?.status == "APPROVED" && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold mb-2">
              Modulo 1
            </button>
          )}
        </div>
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-indigo-950">
            <p className="text-center text-white font-semibold text-3xl pt-4 border-b pb-2">
              Usuario
            </p>
            <div className="flex justify-center border mx-16 my-2 bg-white rounded">
              <Image
                alt="user photo"
                src={svgLogo}
                height={200}
                width={200}
                className="p-2"
              />
            </div>

            <p className="text-center text-white font-semibold text-2xl pt-4">
              {user.attributes.name}
            </p>
            <p className="text-center text-white  pt-4 ">
              {user.attributes.email}
            </p>
          </div>

          <div className="bg-indigo-950 col-span-2">
            <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded mb-4">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Actualizar informacion del usuario
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={user.attributes.address || "Direccion"}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="email"
                    value={user.attributes.email}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={user.attributes.email}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="birthdate"
                    value={userData.birthdate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={user.attributes.birthdate || "Cumpleaños"}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="gender"
                    value={userData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={user.attributes.gender || "Genero"}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={user.attributes.name}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={user.attributes.name}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="phone_number"
                    value={userData.phone_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={user.attributes.phone_number || "Telfono"}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
                >
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    </Authenticator>
  );
}
export default Profile;
