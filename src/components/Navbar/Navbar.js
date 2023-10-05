import { Link } from "@aws-amplify/ui-react";
import svgLogo from "../../../public/svg-final.png";
import Image from "next/image";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setuser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

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
  /**
 {admin == 'admin' && <li>
              <Link
                href="/blog/create"
                className="block py-2 pl-3 pr-4 text-sky-500 rounded"
              >
                Nuevo Post
              </Link>
            </li>}
 */
  //console.log(admin)
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="https://flowbite.com/" className="flex items-center">
          <Image
            priority={true}
            src={svgLogo}
            className="h-16"
            alt="svg-swim logo"
            height={80}
            width={85}
          />
        </Link>
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">
          SVG Natacion{" "}
        </span>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Acerca
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Blog
              </Link>
            </li>
            {admin == "admin" && (
              <li>
                <Link
                  href="/blog/create"
                  className="block py-2 pl-3 pr-4 text-sky-500 rounded"
                >
                  Nuevo Post
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/contact"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Contactanos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
