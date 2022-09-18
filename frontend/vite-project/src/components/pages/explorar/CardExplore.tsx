import React, { useState } from 'react'

const CardExplore = () => {
    const [open, setOpen] = useState(false);
    function setearOpen() {
      setOpen(!open);
    }
    
  return (
    <>
     <div className="border-b min-h-16 p-4 flex flex-col gap-4">
            <div className="flex gap-4">
              <a>
                <img
                  className="object-cover rounded w-44  h-36"
                  src="https://classpass-res.cloudinary.com/image/upload/q_auto,w_320,c_scale,h_160,f_auto/ng6fbwd0pavpz7qfifcw.png"
                  alt="img"
                />
              </a>
              <section className="">
                <h6 className="font-bold text-sm text-[#999]">Acroyoga</h6>
                <p className="font-bold text-[#22222]">Lorem, ipsum dolor.</p>
                {!open ? (
                  <p
                    onClick={() => setearOpen()}
                    className="cursor-pointer text-[#0055ff]"
                  >
                    Mostrar mas información
                  </p>
                ) : (
                  <p
                    onClick={() => setearOpen()}
                    className="cursor-pointer text-[#0055ff]"
                  >
                    Mostrar menos
                  </p>
                )}
              </section>
            </div>
            {open ? (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cumque, omnis.
              </p>
            ) : (
              ""
            )}
          </div>
    </>
  )
}

export default CardExplore
