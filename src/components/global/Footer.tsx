import circle from "../../assets/circle.svg"
import cube from "../../assets/cube.svg"
import flip from "../../assets/flip.svg"
import { FaTwitter } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom'
import logo from "../../assets/logo-black.svg"

export default function Footer() {
  return (
    <footer className='w-full h-full mt-24 mb-12 p-2'>
      <nav className='max-w-screen-xl mx-auto h-full flex gap-3 flex-col justify-center items-center'>
        {/* Blue Div */}
        <div className='w-full relative rounded-[32px] h-[60vh] bg-darkBlue flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-10 z-[11]'>
            <h1 className='text-white font-[900] text-3xl xl:text-5xl text-center'>Try CommuniVibe today</h1>
            <div className='flex gap-5 items-center flex-col sm:flex-row'>
              <button className='bg-white font-semibold px-5 py-2 text-darkBlue rounded-lg'>Create an Event</button>
              <button className='text-white font-semibold px-5 py-2 border-2 border-white bg-darkBlue rounded-lg'>Contact Us</button>
            </div>
          </div>
          {/* Icons */}
          <img src={cube} alt='Cube' className='absolute top-0 -translate-y-11 z-10 right-0' />
          <img src={circle} alt='Circle' className='absolute top-10 z-10 left-0' />
          <img src={flip} alt='Flip' className='absolute -bottom-20 z-10 right-10' />
        </div>

        {/* Grey Div */}
        <div className='w-full flex flex-col justify-between bg-[#F7F7F7] px-6 md:px-10 py-5 h-full relative rounded-[32px]'>
          {/* Logo */}
          <img src={logo} alt="Logo Communivibe" className='w-20 h-20' />

          {/* Links */}

          <div className='w-full justify-between gap-2 mt-6 text-mainBlack font-medium flex-wrap flex'>
            <Link to="/" className="text-sm sm:text-base">Terms of service</Link>
            <p className='font-normal text-grey text-sm sm:text-sm'>
              ©CommuniVibe 2023 - All rights reserved 
              </p>
            <Link to="/" className="text-sm sm:text-base">Privacy Policy</Link>

          </div>

          {/* Social Media Icons */}
          <div className='absolute right-6 md:right-10 top-[35%] md:top-1/2 -translate-y-1/2 flex items-center gap-3'>
            <div className='border-2 rounded-full p-2'>
              <FaTwitter className='text-lg' />
            </div>
            <div className='border-2 rounded-full p-2'>
              <FaDribbble className='text-lg' />
            </div>
            <div className='border-2 rounded-full p-2'>
              <FaLinkedinIn className='text-lg' />
            </div>
          </div>

        </div>
      </nav>
    </footer>
  )
}
