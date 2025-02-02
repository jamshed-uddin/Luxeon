import React from "react";
import luxeonChair from "../../../public/assets/luxeonchair.jpg";

import Image from "next/image";
const AboutUs = () => {
  return (
    <div className=" lg:flex items-center mx-3 lg:mx-0">
      <div className="w-full lg:w-1/2">
        <Image src={luxeonChair} alt="chair" height={700} width={700} />
      </div>
      <div className="w-full lg:w-1/2  mt-4 lg:mt-0">
        <h3 className="text-3xl lg:text-4xl font-medium">Redefine you space</h3>
        <p className="text-xl lg:text-3xl lg:-ml-16 mt-3">
          We create timeless, handcrafted furniture that brings sophistication
          and character to your home. Each piece is designed with passion,
          precision, and an eye for detail because your space deserves nothing
          less than perfection.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
