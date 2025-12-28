import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.jpg";
import {
  FaArchway,
  FaUserGraduate,
  FaBook,
  FaListAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileAvatar from "../components/ProfileAvator";

const Staff = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const { email, profilePic } = user || {};

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="h-16 bg-white shadow-lg flex justify-between items-center px-4 md:px-6 w-full z-20 fixed top-0 left-0">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-gray-700 hover:text-green-600 p-2 rounded-lg hover:bg-green-50 transition"
        >
          {sidebarOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>

        <h1 className="text-xl font-bold text-green-700 hidden sm:block">
          Dashboard
        </h1>

        <div className="grid place-content-center">
          <img className="h-12 object-contain" src={logo} alt="logo" />
        </div>

        {/* User Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-gray-100 transition focus:outline-none"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-700">{email}</p>
              <p className="text-xs text-gray-500">Staff</p>
            </div>

            <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
              <ProfileAvatar
                profilePic={profilePic}
                rounded
                className="h-full w-full"
              />
            </div>

            <FaChevronDown
              className={`text-gray-500 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold text-gray-800">
                  Staff Account
                </p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>

              <div className="py-1">
                <Link
                  to="/staff/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  <FaUserCircle />
                  View Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex pt-16">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] transition-transform duration-300 shadow-2xl ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <FaArchway className="mr-2" />
            <span className="font-bold">Staff Panel</span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <Link
              to="/staff/dashboard"
              className="flex items-center px-2 py-2 rounded hover:bg-gray-800 transition"
            >
              <FaArchway className="mr-3" />
              Dashboard
            </Link>

            <details>
              <summary className="flex items-center cursor-pointer px-2 py-2 rounded hover:bg-gray-800">
                <FaUserGraduate className="mr-3" />
                Manage Students
              </summary>
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/staff/student/add"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Add Students
                </Link>
                <Link
                  to="/staff/student/edit/details"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Edit Student
                </Link>
                <Link
                  to="/staff/student/filter/details"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Filter Students
                </Link>
              </div>
            </details>

            <details>
              <summary className="flex items-center cursor-pointer px-2 py-2 rounded hover:bg-gray-800">
                <FaListAlt className="mr-3" />
                Manage Units
              </summary>
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/staff/unit/add"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Add Unit
                </Link>
                <Link
                  to="/staff/unit/edit"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Edit Units
                </Link>
                <Link
                  to="/staff/unit/filter"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Filter Units
                </Link>
              </div>
            </details>
          </nav>

          <div className="border-t border-gray-700 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-semibold transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 px-4 py-10 min-h-screen">
          <div className="max-w-[1100px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Staff;
