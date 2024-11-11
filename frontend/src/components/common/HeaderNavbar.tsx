import Navlink from "./HeaderNavlink";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars2Icon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const navlinks = [
  { path: "/", pageName: "Inicio" },
  { path: "/about_us", pageName: "Nosotros" },
  { path: "/products", pageName: "Tienda" },
  { path: "/blogs", pageName: "Blogs" },
  { path: "/contact", pageName: "Contacto" },
];

export default function HeaderNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLoginMenu = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  useEffect(() => {
    setIsLoginOpen(false);
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <header
        className={`relative bg-[url('/header.jpg')] bg-cover ${
          location.pathname === "/" ? "h-screen overflow-hidden" : "h-full"
        }  bg-no-repeat py-4 px-8 `}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        {/* Navigation */}
        <div className="flex items-center justify-between container mx-auto py-4 z-10">
          <div className="z-10">
            <Link to="/">
              <img src="/logo.svg" alt="Logo Guitar LA" className="h-16" />
            </Link>
          </div>
          {/* Menu Toggle Button */}
          <div className="flex items-center justify-center">
            <button
              className="block lg:hidden text-white focus:outline-none z-40"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <span className=" text-red-400">X</span>
              ) : (
                <span className="">
                  <Bars2Icon className="h-8 w-8" />
                </span>
              )}
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                className={`z-10 ${
                  isOpen ? "hidden" : "block"
                } lg:hidden cursor-pointer`}
              >
                <ShoppingCartIcon className="h-8 w-8 text-white ml-8" />
              </button>
              <div className="flex lg:hidden relative">
                <button
                  type="button"
                  className="z-10"
                  onClick={toggleLoginMenu}
                >
                  <img
                    src="/login-register.png"
                    alt="Icono del login-register"
                    className="h-8 w-8 cursor-pointer relative"
                  />
                </button>
                <div
                  className={`${
                    isLoginOpen ? "opacity-100" : "opacity-0"
                  } absolute top-10 right-0 bg-white py-1 px-6 transition-opacity duration-150 z-10`}
                >
                  <Link
                    to="/login"
                    className="block text-black py-1 border-b-2 border-b-slate-300"
                  >
                    Login
                  </Link>
                  <Link to="/register" className="block text-black py-1">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Links */}
          <nav className={`hidden lg:flex`}>
            <ul className="flex items-center justify-between gap-4">
              {navlinks.map((navlink) => (
                <Navlink
                  key={navlink.pageName}
                  path={navlink.path}
                  pageName={navlink.pageName}
                />
              ))}
            </ul>
            <div className="flex gap-4">
              <button type="button" className="z-10 cursor-pointer">
                <ShoppingCartIcon className="h-8 w-8 text-white ml-8" />
              </button>
              <div className="flex relative">
                <button
                  type="button"
                  className="z-10"
                  onClick={toggleLoginMenu}
                >
                  <img
                    src="/login-register.png"
                    alt="Icono del login-register"
                    className="h-8 w-8cursor-pointer relative"
                  />
                </button>
                <div
                  className={`${
                    isLoginOpen ? "opacity-100" : "opacity-0"
                  } absolute top-10 right-0 bg-white py-1 px-6 transition-opacity duration-150 z-10`}
                >
                  <Link
                    to="/login"
                    className="block text-black py-1 border-b-2 border-b-slate-300"
                  >
                    Login
                  </Link>
                  <Link to="/register" className="block text-black py-1">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden flex items-center justify-center absolute h-screen right-0 top-0 w-80 bg-white bg-opacity-90 p-4 z-20">
            <ul className="flex flex-col items-center gap-8 lg:gap-4">
              {navlinks.map((navlink) => (
                <Navlink
                  key={navlink.pageName}
                  path={navlink.path}
                  pageName={navlink.pageName}
                />
              ))}
            </ul>
          </div>
        )}
        {location.pathname === "/" && (
          <>
            <div>
              <div className="container mx-auto relative">
                <div className="xl:max-w-3xl 2xl:max-w-5xl mx-auto lg:mx-0 py-28 z-10 text-center lg:text-start">
                  <h2 className="text-5xl text-white font-bold mb-6">
                    Tu pasión por la música merece la guitarra perfecta para
                    brillar.
                  </h2>
                  <p className="text-xl text-white mb-8">
                    Explora nuestra colección y encuentra el sonido que te
                    define.
                  </p>
                  <Link to="/products">
                    <button
                      type="button"
                      className="text-lg text-white bg-orange-700 font-bold uppercase py-2 px-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300"
                    >
                      Compra ahora
                    </button>
                  </Link>
                </div>
              </div>
              <div className="hidden h-screen lg:flex">
                <img
                  src="/header-guitarra.png"
                  alt=""
                  className={`transition-opacity duration-300 ease-in-out ${
                    isVisible ? " opacity-100" : " opacity-0"
                  } absolute bottom-0 -right-10`}
                />
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
