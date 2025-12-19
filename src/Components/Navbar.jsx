
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { HiMoon } from "react-icons/hi2";
import { HiOutlineMoon } from "react-icons/hi2";
// import logo from "../assets/logo.jpg";


const Navbar = () => {
  const { user, loading, logoutUser } = useContext(AuthContext);
  const {menuOpen, setMenuOpen}= useState(false);

  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Active link style
  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-[#cf0ae0] font-semibold underline underline-offset-4"
      : "hover:text-[#a911e6d8]";

      const handleLinkClick = () => setMenuOpen(false);

      if (loading) {
    return (
      <div className="w-full p-4 text-center font-bold text-xl">
        Loading...
      </div>
    );
  }
  return (
    <div className="bg-base-200 shadow-sm  fixed top-0 right-0 left-0 z-50">
      <div className=' mx-auto navbar px-4 md:px-40'>
    {/* --------- Mobile Dropdown --------- */}
        <div className="dropdown dropdown-end md:hidden">
          
          <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 left-0 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><NavLink to="/" className={activeStyle} onClick={handleLinkClick}>Home</NavLink></li>
             <li><NavLink to="/all-contests" className={activeStyle} onClick={handleLinkClick} >All Contests</NavLink></li>
             {/* <li><NavLink to="/extra" className={activeStyle} onClick={handleLinkClick}>Extra</NavLink></li> */}
          <li><NavLink to="/leaderboard" className={activeStyle} onClick={handleLinkClick}>Leaderboard</NavLink></li>
          {user && <li><NavLink to="/dashboard" className={activeStyle}  onClick={handleLinkClick}>Dashboard</NavLink></li>}
         
            {!user && (
              <>
                <li><NavLink to="/login" className={activeStyle} onClick={handleLinkClick}>Login</NavLink></li>
              </>
            )}
            
          </ul>
          
        </div>
      <div className="flex-1">
        <Link to="/" className="text-lg md:text-2xl font-bold text-accent flex items-center gap-2">
        {/* <img src={logo} alt="" className='w-10 rounded-full'/> */}
        Compete<span className="ml-[-10px] text-[#dfac07]">Zone</span>
        </Link>
      </div>
      <div className="dropdown dropdown-end md:hidden">
          
          <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          >
            {user && (
            <>
                <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
                  <img
                    src={user.photoURL || "https://i.postimg.cc/T3R9zTny/avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-primary md:hidden "
                  />
                 
                </div>
              
            </>
          )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-35 right-0"
          >
            
          
            {user && (
              <>
                <li><button onClick={logoutUser} className={activeStyle}>Logout</button></li>
              </>
            )}
          </ul>
          
        </div>

      <div className="flex-none">

        {/* THEME TOGGLE */}
                    <label className="swap swap-rotate md:hidden">          <input type="checkbox" onChange={handleThemeToggle} checked={theme === "dark"} />
          {/* Sun Icon */}
          <p className="text-3xl"><HiOutlineMoon /></p>

        {/* Moon Icon */}
            <p className="text-3xl"><HiMoon /></p>
              </label>

        {/* --------- Desktop Menu --------- */}
        <ul className="menu menu-horizontal hidden md:flex gap-4 text-[16px] items-center">
          <li><NavLink to="/" className={activeStyle} onClick={handleLinkClick}>Home</NavLink></li>
             <li><NavLink to="/all-contests" className={activeStyle} onClick={handleLinkClick} >All Contests</NavLink></li>
             {/* <li><NavLink to="/extra" className={activeStyle} onClick={handleLinkClick}>Extra</NavLink></li> */}
          <li><NavLink to="/leaderboard" className={activeStyle} onClick={handleLinkClick}>Leaderboard</NavLink></li>
          
          
          {!user && (
            <>
              <li><NavLink to="/login" className={`{activeStyle} btn btn-outline btn-secondary`}>Login</NavLink></li>
            </>
          )}
          {user && <li><NavLink to="/dashboard" className={activeStyle}  onClick={handleLinkClick}>Dashboard</NavLink></li>}
          <div className="dropdown dropdown-end">
          
          <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          >
            
            {user && (
            <>
                <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
                  <img
                    src={user.photoURL || "https://i.postimg.cc/T3R9zTny/avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-primary "
                  />
                 
                </div>
              
            </>
          )}
          
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
          
            {user && (
              <>
                <li><button onClick={logoutUser} className={activeStyle}>Logout</button></li>
              </>
            )}
          </ul>
          
        </div>
            {/* THEME TOGGLE */}
                    <label className="swap swap-rotate">          <input type="checkbox" onChange={handleThemeToggle} checked={theme === "dark"} />
          {/* Sun Icon */}
          <p className="text-3xl"><HiOutlineMoon /></p>

        {/* Moon Icon */}
            <p className="text-3xl"><HiMoon /></p>
              </label>
        </ul>
          
        
      </div>
            </div>
    </div>
  );
};

export default Navbar;




