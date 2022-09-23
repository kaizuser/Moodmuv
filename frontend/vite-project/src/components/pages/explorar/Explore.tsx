import React from "react";
import Select from "./Select";
import CardExplore from './CardExplore'
const Explore = () => {
    let array = [1,2,3,4,5,6,7,8]
  return (
    <div className="w-full h-screen">
        <div className="min-h-12 w-full flex gap-4 p-4 px-8 shadow-md">
            <Select />
            <Select />
            <Select />
            <Select />
        </div>
        <div className="flex w-100  ">
            <div className="w-4/6 px-4 h-screen bg-[#F3F3F3] flex flex-wrap gap-4 justify-center overflow-scroll p-4">
            {
                array.map(e=><CardExplore key={e}/>)
            }
            </div>
            <div className="w-3/6 h-screen bg-[#222]">
            aca va el mapa
            </div>
        </div>
    </div>
  );
};

export default Explore;
