import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogoutBtn, Logo } from "../index";
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for hamburger menu

function Header() {
  const userStatus = useSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", url: "/", active: true },
    { name: "Log-In", url: "/login", active: !userStatus },
    { name: "Sign-Up", url: "/signup", active: !userStatus },
    { name: "All-Posts", url: "/all-post", active: userStatus },
    { name: "Add-Post", url: "/add-post", active: userStatus },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="py-3 shadow bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {navItems.map(
            (item) =>
              item.active && (
                <NavLink
                  key={item.name}
                  to={item.url}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-blue-500' : 'hover:bg-blue-700'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )
          )}
          {userStatus && <LogoutBtn />}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="space-y-4 p-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium ${
                          isActive ? 'bg-blue-500' : 'hover:bg-blue-700'
                        }`
                      }
                      onClick={toggleMenu} // Close menu on item click
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {userStatus && (
              <li>
                <LogoutBtn onClick={toggleMenu} />
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
