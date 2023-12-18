import Image from "next/image";
import Right from "../icons/Right";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className=" py-12">
          <h1 className=" text-4xl font-semibold  leading-tight">
            Everything <br /> is better with a <br />{" "}
            <span className="text-red-500"> Pizza</span>
          </h1>
          <p className=" my-6 to-gray-500 text-sm">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </p>
          <div className="gap-4 flex">
            <button className="flex gap-4 capitalize bg-primary rounded-full hover:bg-red-400 text-white px-4 py-2 font-medium">
              Order now <Right />
            </button>
            <button className="flex gap-4 px-4 py-2 text-gray-400 hover:text-gray-700 font-semibold">
              Learn more <Right />
            </button>
          </div>
        </div>
        <div className=" relative">
          <Image
            src={"/pizza.png"}
            objectFit={"contain"}
            layout={"fill"}S
            alt="pizza"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
