import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const token = null;
    const userData = null;

    return (
        <nav className="bg-blue-600 py-3 px-[3rem] flex justify-between items-center">
            <Link to="/" className="text-white font-bold text-xl">
                PoShare
            </Link>
            <div className='flex gap-5 items-center'>
                {token && (
                    <button
                        className="text-white px-4 py-2 mr-2 bg-blue-700 rounded hover:bg-blue-800 transition duration-300"
                    // onClick={() => dispatch(logout(navigate))}
                    >
                        Logout
                    </button>
                )}
                {token && (
                    <Link to="/dashboard" className="text-white rounded hover:bg-blue-700 p-2 transition duration-300">
                        <div>
                            <img
                                src={userData?.profilePicture?.url || `https://api.dicebear.com/5.x/initials/svg?seed=${userData?.name}`}
                                alt="User Profile"
                                className="w-12 h-12 border-2 border-blue-700 rounded-full"
                            />
                        </div>
                    </Link>
                )}

                {!token && (
                    <Link
                        to="/login"
                        className="text-white px-4 py-2 mr-2 bg-blue-700 rounded hover:bg-blue-800 transition duration-300"
                    >
                        Login
                    </Link>
                )}
                {!token && (
                    <Link
                        to="/signup"
                        className="text-white px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition duration-300"
                    >
                        Sign Up
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default NavBar
