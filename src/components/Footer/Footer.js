import Image from "next/image";
import Link from "next/link";
import svgLogo from "../../../public/final.png";
import acuatica from "../../../public/acuaticaBlanco.png";

function Footer() {
  return (
    <footer className="shadow bg-indigo-950">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-wrap items-center justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0">
            <Image
              priority={true}
              src={svgLogo}
              className="h-16 mr-3"
              alt="svg-swim logo"
              width={120}
              height={70}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SVG-NATACION
            </span>
          </a>
          <Link href="https://anv.mx" target="_blank">
            <Image
              src={acuatica}
              className="h-16 mr-3"
              alt="acuatica-logo"
              width={220}
              height={180}
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 pt-2 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 flex justify-center content-center items-center ss:flex ss:flex-col">
          © 2023 Nielad . All Rights Reserved.
          <Link
            href="https://www.buymeacoffee.com/nieladverse"
            className="ml-3 "
            target="_blank"
          >
            <img
              src="https://img.buymeacoffee.com/button-api/?text= &emoji=&slug=nieladverse&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
              alt="coffe-me"
            />
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
