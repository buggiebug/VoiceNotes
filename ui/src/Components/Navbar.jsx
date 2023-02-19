import {React,useState,useContext} from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom";

import logo from"../Images/logo.png";

import myContext from "../Context/createContextAPI";

export default function Navbar() {
  const user1token = "user1token";  

  const location = useLocation();
  const navigate = useNavigate();

  const {allMusic,setUserNameState} = useContext(myContext);

  // Hamburger & Menu button navigation...
  const [showMenu, setShowMenu] = useState("hidden");
  const [showHamburger, setShowHamburger] = useState("fa-solid fa-bars-staggered");
  const changeMenuType =    () => {
    if(showMenu === "hidden" && showHamburger === "fa-solid fa-bars-staggered") {
        setShowMenu("visible");
        setShowHamburger("fa-brands fa-xing");
    } else {
        setShowMenu("hidden");
        setShowHamburger("fa-solid fa-bars-staggered");
    }
  }
  // When click on any Link then close the menu button...
  function goto(){
    setShowMenu("hidden");
    setShowHamburger("fa-solid fa-bars-staggered");
  }

  //    //! Logout...
  const logout = ()=>{
    localStorage.removeItem(user1token);
    navigate("/login");
    setUserNameState("");
    allMusic();
  }

  return (
    <div>
        <nav className="fixed top-0 right-0 left-0 border-none px-5 py-1 bg-gray-800 z-20">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center order-2 md:order-1">
                    <img src={logo} className="h-14 hover:opacity-80" alt="Music_app_logo"/>
                </Link>
                <div className="md:hidden flex order-1 md:order-3">
                    <button onClick={changeMenuType} type="button" className="inline-flex items-center cursor-pointer p-2 w-9 text-xl rounded-lg md:hidden outline-none md:hover:ring-1 text-orange-500 ring-orange-500">
                        <i className={`${showHamburger} cursor-pointer transition-all duration-100`}></i>
                    </button>
                </div>
                <div className={`order-3 md:order-2 ${showMenu} justify-between items-center w-full md:flex md:w-auto`}>
                    <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 font-medium bg-transparent">
                        <li>
                            <Link to="/" onClick={goto} className={`${location.pathname==="/"?"text-orange-500":""} block py-2 pr-4 pl-3 rounded text-base text-white hover:text-white hover:bg-orange-500`}>HOME</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={goto} className={`${location.pathname==="/about"?"text-orange-500":""} block py-2 pr-4 pl-3 rounded text-base text-white hover:text-white hover:bg-orange-500`}>ABOUT</Link>
                        </li>
                    </ul>
                </div>
                <div className={`md:mr-5 order-4 ${!localStorage.getItem(user1token)?"block":"hidden"}`}>
                    <Link to={"/login"} className={`${location.pathname==="/login"?"text-orange-500":""} block py-2 pr-4 pl-3 rounded text-base text-white hover:text-white hover:bg-orange-500`}><i className="ml-2 fa fa-sign-in" aria-hidden="true"></i></Link>
                </div>
                <div className={`md:mr-5 order-4 ${localStorage.getItem(user1token)?"block":"hidden"}`}>
                    <button onClick={logout} className={`block py-2 pr-4 pl-3 rounded text-base hover:bg-gray-700 text-white hover:text-white`}><i className="ml-2 fa fa-sign-out rotate-180" aria-hidden="true"></i></button>
                </div>
            </div>
        </nav>
    </div>
  )
}
