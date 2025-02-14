import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../service";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const avatar = useSelector((state) => state.user.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className='flex items-center justify-between bg-blue-600 px-[3rem] py-3'>
      <Link to='/' className='text-xl font-bold text-white'>
        PoShare
      </Link>
      <div className='flex items-center gap-5'>
        {token && (
          <button
            className='mr-2 rounded bg-blue-700 px-4 py-2 text-white transition duration-300 hover:bg-blue-800'
            onClick={() => dispatch(logoutUser(navigate))}
          >
            Logout
          </button>
        )}
        {token && (
          <Link
            to='/'
            className='rounded p-2 text-white transition duration-300 hover:bg-blue-700'
          >
            <div>
              <img
                src={
                  avatar ||
                  `https://api.dicebear.com/5.x/initials/svg?seed=${userData?.name}`
                }
                alt='User Profile'
                className='h-12 w-12 rounded-full border-2 border-blue-700'
              />
            </div>
          </Link>
        )}

        {!token && (
          <Link
            to='/login'
            className='mr-2 rounded bg-blue-700 px-4 py-2 text-white transition duration-300 hover:bg-blue-800'
          >
            Login
          </Link>
        )}
        {!token && (
          <Link
            to='/signup'
            className='rounded bg-blue-700 px-4 py-2 text-white transition duration-300 hover:bg-blue-800'
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
