import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/logoDegradeCircle.png'
const Footer = () => {
  return (
    <>
      <footer className="p-4 shadow md:px-6 md:py-8">
	      <div className="flex sm:items-center sm:justify-between sm:flex-row justify-center items-center flex-col space-y-3">
		      <Link to="/home" className="hover:underline flex flex-col gap-3 justify-center items-center">
            <img
              src={Logo}
		    className="m-0 h-8 w-8"
              alt="Flowbite Logo"
            />
            <span className="text-[#999] self-center font-medium whitespace-nowrap">
              Moodmuv
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 ">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Explorar
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Planes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Quienes somos
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto -700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2022{" "}
          <Link to="/home" className="hover:underline">
            Moodmuv
          </Link>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
};

export default Footer;
