import { Link } from "@aws-amplify/ui-react";
import svgLogo from "../../../public/svg-final.png";
import Image from "next/image";
import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";

function Navbar() {
  const [signedInUser, setSignedInUser] = useState(false);
  const [user, setuser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
   // getUser();
    authListener();
  }, []);

  /*
  async function getUser() {
    try {
      const resp = await Auth.currentSession();
      if (resp == "No current user") return;
      setAdmin(resp?.idToken.payload["cognito:groups"]?.[0]);
    } catch (error) {
      //console.log(error);
    }

    //setuser(resp.idToken.payload.name)
    //setAdmin(resp?.idToken.payload['cognito:groups']?.[0])
  }
*/
  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedInUser(true);
        case "signOut":
           setSignedInUser(false);
           setAdmin("")
           break;
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
      const resp = await Auth.currentSession();
      setAdmin(resp?.idToken.payload["cognito:groups"]?.[0]);
    } catch (err) {}
  }

  return (
    <nav className="bg-indigo-950 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image
            priority={true}
            src={svgLogo}
            className="h-16"
            alt="svg-swim logo"
            height={80}
            width={85}
          />
        </Link>
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          SVG Natacion{" "}
        </span>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-indigo-950 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 !text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 pl-3 pr-4 !text-white"
              >
                Acerca
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block py-2 pl-3 pr-4 !text-white"
              >
                Blog
              </Link>
            </li>
            {admin == "admin" && (
              <li>
                <Link
                  href="/blog/create"
                  className="block py-2 pl-3 pr-4 rounded !text-red-500"
                >
                  Nuevo Post
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/contact"
                className="block py-2 pl-3 pr-4 !text-white"
              >
                Contactanos
              </Link>
            </li>
            {signedInUser && (
              <li>
                <Link
                  href="/profile"
                  className="block py-2 pl-3 pr-4 !text-purple-400"
                >
                  Perfil
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
