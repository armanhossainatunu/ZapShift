import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, logout } = useAuth();
  const handelLogOut = () => {
    logout()
      .then(() => {
        // Sign-out successful.\
        toast("Logout Successfully");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
      <li>
        <NavLink to="">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 rounded-2xl mb-3 sticky top-0 z-50 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div>
            <div className="">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="user profile" src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <Link
                    onClick={handelLogOut}
                    to="/auth/login"
                    className="btn btn-outline mr-2"
                  >
                    Sign Up
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-outline mr-2">
              Login
            </Link>
             <Link className="btn btn-outline mr-2" to="/rider">
          Be a rider
        </Link>
          </>
        )}
       
      </div>
    </div>
  );
};

export default NavBar;
