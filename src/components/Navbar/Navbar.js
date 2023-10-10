import { Link } from "@aws-amplify/ui-react";
import svgLogo from "../../../public/final.png";
import Image from "next/image";
import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Navbar() {
  const [signedInUser, setSignedInUser] = useState(false);
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    authListener();
    const init = async () => {
      const { Collapse, Dropdown, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown });
    };
    init();
  }, [signedInUser]);

  async function logOut() {
    try {
      const outUser = await Auth.signOut();
      router.reload();
    } catch (error) {}
  }

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
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
      const resp = await Auth.currentSession();
      const currentAdmin = resp?.idToken.payload["cognito:groups"]?.[0];
      setAdmin(currentAdmin);
    } catch (err) {}
  }

  return (
    <nav className="fixed top-0 flex w-full flex-wrap items-center justify-between bg-indigo-950 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700  lg:py-4 z-40">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 md:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div
          className="!visible hidden flex-grow basis-[100%] items-center md:!flex md:basis-auto justify-between"
          id="navbarSupportedContent1"
          data-te-collapse-item
        >
          <Link
            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 md:mb-0 md:mt-0"
            href="/"
          >
            <Image
              src={svgLogo}
              style={{ height: 70, width: 130 }}
              alt="TE Logo"
              loading="lazy"
            />
          </Link>

          <h1 className="text-3xl text-white">SVG Natacion</h1>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  bg-indigo-950 md:flex-row md:space-x-8 md:mt-0 md:border-0">
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
              <Link href="/about" className="block py-2 pl-3 pr-4 !text-white">
                Acerca
              </Link>
            </li>
            <li>
              <Link href="/blog" className="block py-2 pl-3 pr-4 !text-white">
                Blog
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="block py-2 pl-3 pr-4 !text-white"
              >
                Contactanos
              </Link>
            </li>
            {signedInUser && (
              <div
                className="relative pt-2"
                data-te-dropdown-ref
                data-te-dropdown-alignment="end"
              >
                <a
                  className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  href="#"
                  id="dropdownMenuButton2"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-adjustments-alt"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 8h4v4h-4z"></path>
                    <path d="M6 4l0 4"></path>
                    <path d="M6 12l0 8"></path>
                    <path d="M10 14h4v4h-4z"></path>
                    <path d="M12 4l0 10"></path>
                    <path d="M12 18l0 2"></path>
                    <path d="M16 5h4v4h-4z"></path>
                    <path d="M18 4l0 1"></path>
                    <path d="M18 9l0 11"></path>
                  </svg>
                </a>

                <ul
                  className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton2"
                  data-te-dropdown-menu-ref
                >
                  <li>
                    <Link
                      href="/profile"
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    >
                      Perfil
                    </Link>
                  </li>
                  {admin == "admin" && (
                    <li>
                      <Link
                        href="/blog/create"
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal !text-red-500 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      >
                        Nuevo Post
                      </Link>
                    </li>
                  )}
                  <li>
                    <p
                      href="/profile"
                      onClick={logOut}
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30 cursor-pointer"
                    >
                      Cerrar Session
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>

        <div className="relative flex items-center"></div>
      </div>
    </nav>
  );
}

export default Navbar;
