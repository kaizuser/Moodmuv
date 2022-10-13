/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logoDegrade.png";

//UTILITIES
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../../redux/actions/userActions";

const navigation = [
  { name: "Explorar", href: "#", current: false },
  { name: "Planes", href: "#", current: false },
  { name: "Como funciona la plataforma", href: "#", current: false },
  { name: "Iniciar sesión", href: "#", current: false },
  { name: "Activa tu prueba", href: "#", current: true },
];

const link = ["/explore", "/payments", "/howTo", "/signIn", "/activateAccount"];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function Example(props: any) {
  let navigate = useNavigate()
  const [openDrop, setOpenDrop] = useState(false);
  const setearOpenDrop = () => {
    setOpenDrop(!openDrop);
  };
  return (
    <Disclosure as="nav" className=" relative z-10">
      {({ open }) => (
        <>
          <div className="mx-auto h-24 max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center md:justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-between rounded-md p-2 text-[#563D81]  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center sm:justify-end justify-end h-full">
                {/* logos */}
                <div className="flex justify-between flex-shrink-0 items-center h-full">
                  <Link to={"/home"}>
                    <img
                      className="hidden sm:block h-full p-2 w-20 object-contain"
                      src={Logo}
                      alt="Your Company"
                    />
                    <img
                      className="self-end block sm:hidden h-full p-2 w-20 object-contain"
                      src={Logo}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden md:block sm:ml-6 w-full">
                  <div className="flex justify-end items-center">
                    {navigation.map((item, index) => (
                      <div key={item.name}>
                        {item.name == "Iniciar sesión" ? (
                          props.currentUser ? (
			      <div>

                              <button className="w-auto mr-4" onClick={() => setearOpenDrop()}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </button>
                              <div
                                className={
                                  openDrop
                                    ? "flex flex-col gap-2 text-xs text-center border rounded absolute right-36 top-16 px-4 justify-center items-center bg-white text-[#42136] w-24 h-24"
                                    : "hidden"
                                }
                              >
                                <Link
                                  className="text-[#323232]"
                                  to={"/account"}
                                >
                                  Profile
                                </Link>
                                <Link
                                  className="text-[#323232]"
                                  to={"/account/settings"}
                                >
                                  Settings
                                </Link>

			      <button className="p-[0] text-[#323232]" onClick={() => {
				      props.logOut()
				      navigate('/home')
				      window.scrollTo(0, 0);
			      }}>
			      Log out
			      </button>

                              </div>

			      </div>
                          ) : (
                            <Link
                              to={link[navigation.indexOf(item)]}
                            >
                              <span
                                className={classNames(
                                  item.current
                                    ? "hover:bg-gradient-to-r hover:from-[#443166] hover:to-[#59457B] bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-white"
                                    : "text-black",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </span>
                            </Link>
                          )
                        ) : (
                          <Link
                            to={link[navigation.indexOf(item)]}
                          >
                            <span
                              className={classNames(
                                item.current
                                  ? "hover:bg-gradient-to-r hover:from-[#443166] hover:to-[#59457B] bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-white"
                                  : "text-black",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item, index) => (
                <div key={index}>
                {
                  item.name == "Iniciar sesión" ? (props.currentUser ? (<Disclosure.Button
                    as="a"
                    href={"/account"}
                    className={classNames(
                      item.current
                        ? "bg-gradient-to-r from-[#563D81] to-[#563D81] text-white"
                        : "text-[#2C2C2C] hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    Cuenta
                  </Disclosure.Button>) : (<Disclosure.Button
                    as="a"
                    href={link[navigation.indexOf(item)]}
                    className={classNames(
                      item.current
                        ? "bg-gradient-to-r from-[#563D81] to-[#563D81] text-white"
                        : "text-[#2C2C2C] hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>)) : (<Disclosure.Button
                  as="a"
                  href={link[navigation.indexOf(item)]}
                  className={classNames(
                    item.current
                      ? "bg-gradient-to-r from-[#563D81] to-[#563D81] text-white"
                      : "text-[#2C2C2C] hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>)
                }
              </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const mapDispatch = {
	logOut:userActions.logOut
}

const connector = connect(null, mapDispatch)

export default connector(Example)


