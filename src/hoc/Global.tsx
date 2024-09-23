import React from 'react'
import Navbar from '../components/global/Navbar'
import Footer from '../components/global/Footer'
import { useLocation } from 'react-router-dom';

export default function Global({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <main className='flex items-center justify-center flex-col p-2'>
      {location.pathname === '/' ? <Navbar/> : ["/"].some(path => path === location.pathname || /^\/dashboard\//.test(location.pathname)) ? null : ["/login","/signup"].includes(location.pathname) ? null : <Navbar/>}
    {children}
    {["/login","/signup"].some(path => path === location.pathname || /^\/dashboard\//.test(location.pathname)) ? null : <Footer />}
    </main>
  )
}
