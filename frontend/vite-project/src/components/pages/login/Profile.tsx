import React from "react";

const Profile = () => {
  return (
    <>
      <div className="bg-[#F3F3F3] min-h-screen flex flex-col justify-center items-center">
        <div className="h-[80vh] w-full bg-[#222]"></div>
        <div className="flex flex-col items-center rounded-xl bg-white w-11/12 h-96 -translate-y-48 shadow">
          <div className="flex  justify-center">
            <div></div>
            <img className="w-40 rounded-full -translate-y-16" src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"/>
            <div></div>
          </div>
          <h2 className="font-bold text-4xl text-[#222]">Jenna Stones</h2>
        </div>
      </div>
    </>
  );
};

export default Profile;
