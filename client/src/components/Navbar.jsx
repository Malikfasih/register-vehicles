import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import decode from "jwt-decode";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // check if the token is expired then logout the user
  useEffect(() => {
    const token = user?.token;
    // console.log("token", token);

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        alert("session expired");
        setLogout();
        navigate("/");
      }
    }
  }, []);

  // button redirects to authentication
  const handleAuthButton = () => {
    if (user?.result) {
      dispatch(setLogout());
      navigate("/auth");
    }
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <h1 className="text-lg text-white font-bold">
              Register Your Vehicle
            </h1>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-white text-lg font-semibold px-3 py-2"
                  id="user-menu-button"
                  onClick={handleAuthButton}
                >
                  {user?.result ? "Log out" : "Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
