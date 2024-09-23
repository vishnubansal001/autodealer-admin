import React from "react";

const AnalyticCard = ({ heading, data = [], xClass }: { heading: string, data?: Array<any>, xClass: string }) => {
  return (
    <div className={`w-full flex items-center justify-center  border  rounded-md p-4 + ${xClass}`}>
      <div className="flex w-full items-center justify-center gap-2 flex-col px-2">
        <div className="flex items-center justify-start text-lg w-full">
          {heading}
        </div>
        <div className="flex items-center gap-4 text-sm justify-center flex-col w-full">
          <div className="flex items-center gap-4 justify-between w-full">
            <div>1. Templates</div>
            <div>01</div>
          </div>
          <div className="flex items-center gap-4 justify-between w-full">
            <div>2. Templates</div>
            <div>01</div>
          </div>
          <div className="flex items-center gap-4 justify-between w-full">
            <div>3. Templates</div>
            <div>01</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticCard;
