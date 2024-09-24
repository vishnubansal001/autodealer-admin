import React from "react";
import { NavLink } from "react-router-dom";

const HeaderLinks = ({link,text}:{link:string,text:string}) => {
  return (
    <>
      <NavLink to={link} className={"sm:flex hidden"}>
        <p className="text-white text-base">{text}</p>
      </NavLink>
    </>
  );
};

export default HeaderLinks;
