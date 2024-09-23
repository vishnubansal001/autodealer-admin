import React from 'react'

const FooterLinks = ({text}:{text:string}) => {
  return (
    <div className="flex items-center justify-center">
            <p className="text-white text-sm sm:text-base">
             {text}
            </p>
          </div>
  )
}

export default FooterLinks