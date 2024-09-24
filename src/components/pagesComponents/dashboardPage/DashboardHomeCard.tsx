import React from "react";

const DashboardHomeCard = ({text,value,xClass}:{text:string,value:string,xClass:string}) => {
  return (
    <div className={`flex items-center justify-center p-4  border rounded-md w-full h-full + ${xClass}`}>
      <div className="flex items-center justify-center px-2 py-4  flex-col gap-4 w-full">
        <div className="flex items-center justify-start w-full">
          <h1 className="text-2xl font-medium">{text}</h1>
        </div>
        <div className="flex items-center justify-end w-full">
          <p className="text-5xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeCard;
