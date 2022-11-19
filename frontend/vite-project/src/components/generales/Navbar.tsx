/* This example requires Tailwind CSS v2.0+ */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menuu from '@mui/material/Menu';
import { useState,useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logoDegrade.png";

//UTILITIES
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../../redux/actions/userActions";
import teacherActions from '../../redux/actions/teacherActions'
import studentActions from '../../redux/actions/studentActions'
import activityActions from '../../redux/actions/activityActions'
import { RootState } from '../../main';
import axios from 'axios';
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
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
	let [fileValue, setFile] = useState(undefined)

  const setearOpenDrop = () => {
    setOpenDrop(!openDrop);
  };

  const handleOpenUserMenu = (event:any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  let id = props.currentUser?._id
	useEffect(() => {
	  async function fetchFile (){
		let file:string | any = await axios({
      method:'get',
			url:'http://localhost:4000/api/files/avatarProfile/' + id,
		})

		setFile(file.data)
	  }

	  fetchFile()
	}, ["todavia no sé que poner aca"])


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
                          props.currentUser?._id ? (
<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, m:0, width:"auto", mr:5 }}>
                <Avatar alt="P" src={fileValue !== undefined ? (`data:image/png;base64,${fileValue}`) : ("")} sx={{width:30, height:30, fontSize:20}}/>
              </IconButton>
            </Tooltip>
            <Menuu
               sx={{ mt: '45px' }}
               id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                  <Link to={'/account'}>
                <MenuItem onClick={handleCloseUserMenu}>
                    Profile
                </MenuItem>
                  </Link>

		  <Link to={'/account/panel'}>
		  <MenuItem onClick={handleCloseUserMenu}>
		    Panel
		  </MenuItem>
		  </Link>

                  <Link to={'/account/settings'}>
                <MenuItem onClick={handleCloseUserMenu}>
                    Setting
                </MenuItem>
                  </Link>

                  <Typography onClick={() => {
                                   props.logOut()
                                     setearOpenDrop()
                                     navigate('/home')
                                     window.scrollTo(0, 0);
				     props.resetStoreTeacher()
				     props.resetStoreStudent()
				     props.resetStoreActivities()
                               }}>

                <MenuItem onClick={handleCloseUserMenu}>
                    Logout
                </MenuItem>

                  </Typography>
            </Menuu>
          </Box>
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
                  item.name == "Iniciar sesión" ? (props.currentUser?._id ? (<Disclosure.Button
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
	logOut:userActions.logOut,
	resetStoreTeacher:teacherActions.resetStore,
	resetStoreStudent:studentActions.resetStore,
	resetStoreActivities:activityActions.resetStore,
  fetchActivity:activityActions.fetchActivity,
	setMetadata:userActions.setMetadata,
	uploadFile:userActions.uploadFile
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser,
		activity:state.activityReducer.activity
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(Example)


