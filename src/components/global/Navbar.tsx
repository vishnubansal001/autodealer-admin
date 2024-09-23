import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo-black.svg"

export default function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar") as HTMLElement | null;

      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add("bg-[#ffffff]");
          navbar.classList.remove("bg-transparent");
        } else {
          navbar.classList.remove("bg-[#ffffff]");
          navbar.classList.add("bg-transparent");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);                                                                  
  return (
    <header className="w-full navbar fixed top-0 flex items-center justify-center z-[50]">
    <nav className='w-full px-2 flex items-center justify-center max-w-screen-xl mx-auto'>
      <div className='w-full px-3 py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center justify-center'><img src={logo} alt="Logo Communivibe" className='w-16 h-16' /></div>

        {/* Links */}
        <div className='flex items-center justify-center'><ul className='hidden list-none md:flex items-center gap-3 text-sm font-medium'>
          <li>Home</li>
          <li>About</li>
          <li>Product</li>
          <li>Features</li>
          <li>Contact</li>
        </ul></div>

        {/* Button */}
        <div className='flex items-center justify-center'><Link to={"/"} className='bg-mainBlue px-7 py-1 rounded-lg text-white font-semibold'>
          Login
        </Link></div>
      </div>
    </nav>
    </header>
  )
}
