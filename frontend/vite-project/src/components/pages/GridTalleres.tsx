import React from "react";

const GridTalleres = () => {
  return (
    <div className="min-h-full w-full mb-28 flex flex-col justify-center items-center p-4 gap-4  bg-transparent">
      <h2 className="p-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-5xl">
        Talleres
      </h2>
      <div className="flex gap-4 h-56">
        <div className="border grow rounded-3xl relative flex justify-center items-start">
          <img
            className="h-full w-full rounded-3xl object-cover"
            src="https://s3.envato.com/files/193419181/Preview%20Image%20Set/03%20Yoga%20Flyer.jpg"
            alt="img event"
          />
          <h4 className="absolute text-left py-1 px-2 left-2 top-2 text-white font-bold text-sm bg-gradient-to-r from-[#563D81] to-[#6E5E8B] rounded-3xl">Taller</h4>
        </div>
        <div className="border grow rounded-3xl relative flex justify-center items-start">
          <img
            className="h-full w-full rounded-3xl object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXkjLNZZOHYTyFNfx1ocMbCWxVLLi-Yl5hw&usqp=CAU"
            alt="img event"
          />
          <h4 className="absolute text-left py-1 px-2 left-2 top-2 text-white font-bold text-sm bg-gradient-to-r from-[#563D81] to-[#6E5E8B] rounded-3xl">Taller</h4>
        </div>
        <div className="border grow rounded-3xl relative flex justify-center items-start">
          <img
            className="h-full w-full rounded-3xl object-cover"
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yoga-classes-video-flyer-design-template-ab272275bae005ab0ae89444f68cec29_screen.jpg?ts=1567091341"
            alt="img event"
          />
          <h4 className="absolute text-left py-1 px-2 left-2 top-2 text-white font-bold text-sm bg-gradient-to-r from-[#563D81] to-[#6E5E8B] rounded-3xl">Taller</h4>
        </div>
      </div>
      <div className="w-full flex gap-4 h-56">
        <div className="border grow rounded-3xl relative flex justify-center items-start">
          <img
            className="h-full w-full rounded-3xl object-cover"
            src="https://i.pinimg.com/originals/5d/c3/ec/5dc3ec753259b385f4cc39bc055c3e2c.jpg"
            alt="img event"
          />
          <h4 className="absolute text-left py-1 px-2 left-2 top-2 text-white font-bold text-sm bg-gradient-to-r from-[#563D81] to-[#6E5E8B] rounded-3xl">Taller</h4>
        </div>
        <div className="border grow rounded-3xl relative flex justify-center items-start">
          <img
            className="h-full w-full rounded-3xl object-cover"
            src="https://styleflyers.com/wp-content/uploads/2016/02/yoga-flyer-372x537.jpg"
            alt="img event"
          />
          <h4 className="absolute text-left py-1 px-2 left-2 top-2 text-white font-bold text-sm bg-gradient-to-r from-[#563D81] to-[#6E5E8B] rounded-3xl">Taller</h4>
        </div>
      </div>
      <div className="w-full h-80 grow flex  relative flex justify-center items-startborder rounded-3xl">
        <img
          className="grow rounded-3xl object-cover"
          src="https://s3.envato.com/files/193419181/Preview%20Image%20Set/03%20Yoga%20Flyer.jpg"
          alt="img event"
        />
        <h4 className="absolute text-left py-1 px-2 left-2 top-2 text-white font-bold text-sm bg-gradient-to-r from-[#563D81] to-[#6E5E8B] rounded-3xl">Taller</h4>
      </div>
    </div>
  );
};

export default GridTalleres;
