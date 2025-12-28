import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.jpg";
import {
  FaArchway,
  FaUserGraduate,
  FaBook,
  FaListAlt,
  FaChalkboardTeacher,
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

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const profileRef = useRef(null);
  const { email, profilePic } = user || {};

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const toggleMenu = (menu) =>
    setOpenMenu((prev) => (prev === menu ? null : menu));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm z-30 flex items-center justify-between px-4 md:px-6">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <h1 className="hidden sm:block text-lg font-semibold text-green-700">
          Dashboard
        </h1>

        <img src={logo} alt="logo" className="h-10 object-contain" />

        {/* PROFILE DROPDOWN */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-gray-100 transition"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-700">{email}</p>
              <p className="text-xs text-gray-500">Staff</p>
            </div>

            <div className="h-9 w-9 rounded-full overflow-hidden">
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

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-50">
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-gray-800">
                  Staff Account
                </p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>

              <div className="py-1">
                <Link
                  to="/staff/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <FaUserCircle />
                  View Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white z-30 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="h-16 flex items-center justify-center border-b border-gray-700">
            <FaArchway className="mr-2" />
            <span className="font-semibold">Staff Panel</span>
          </div>

          <nav className="px-4 py-6 space-y-2 overflow-y-auto">
            <Link
              to="/staff/dashboard"
              className="flex items-center px-2 py-2 rounded-md hover:bg-gray-800"
            >
              <FaArchway className="mr-3" />
              Dashboard
            </Link>

            {/* ACCORDION MENUS */}
            {[
              {
                key: "students",
                icon: <FaUserGraduate />,
                title: "Manage Students",
                links: [
                  ["/staff/student/add", "Add Students"],
                  ["/staff/student/edit/details", "Edit Student"],
                  ["/staff/student/filter/details", "Filter Students"],
                ],
              },
              {
                key: "units",
                icon: <FaListAlt />,
                title: "Manage Units",
                links: [
                  ["/staff/unit/add", "Add Unit"],
                  ["/staff/unit/edit", "Edit Units"],
                  ["/staff/unit/filter", "Filter Units"],
                ],
              },
              {
                key: "marks",
                icon: <FaChalkboardTeacher />,
                title: "Manage Marks",
                links: [
                  ["/staff/mark/add", "Register Marks"],
                  ["/staff/mark/edit", "Edit Marks"],
                  ["/staff/mark/view", "Filter Marks"],
                ],
              },
              {
                key: "enrollment",
                icon: <FaBook />,
                title: "Manage Enrollment",
                links: [
                  ["/staff/enrollment/add", "Create Enrollment"],
                  ["/staff/enrollment/view", "Edit Enrollment"],
                  ["/staff/enrollment/filter", "Filter Enrollment"],
                ],
              },
            ].map((menu) => (
              <div key={menu.key}>
                <button
                  onClick={() => toggleMenu(menu.key)}
                  className="w-full flex items-center px-2 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  <span className="mr-3">{menu.icon}</span>
                  <span className="flex-1 text-left">{menu.title}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      openMenu === menu.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu === menu.key && (
                  <div className="ml-8 mt-1 space-y-1">
                    {menu.links.map(([to, label]) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        className="block px-2 py-1 text-sm rounded hover:bg-gray-700"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:opacity-95 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 lg:ml-64 px-4 py-10">
          <div className="max-w-[1100px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
