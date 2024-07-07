import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { LogoutBtn, Logo } from "../index"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const userStatus = useSelector((state) => state.auth.status)

  const navItems = [{ name: "Home", url: "/", active: true },
  { name: "Log-In", url: "/login", active: !userStatus },
  { name: "Sign-Up", url: "/signup", active: !userStatus },
  { name: "All-Posts", url: "/all-post", active: userStatus },
  { name: "Add-Post", url: "/add-post", active: userStatus },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />

            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active && (
                <li key={item.name}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `inline-block px-6 py-2 rounded-full duration-200 ${
                        isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 hover:text-gray-800'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
            )}
            {userStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Header