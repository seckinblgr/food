import Image from "next/image";

const MenuItem = ({name}) => {
  return (
    <div className=" bg-gray-200 mb-4 mt-4 p-4 border-2 border-gray-300 hover:bg-white transition-all  hover:shadow-xl hover:shadow-black rounded-md  text-center  mx-8 hove">
      <Image
        className=" mx-auto hover:rotate-90 hover:scale-110 duration-500 transition-all"
        src="/pizza.png"
        width={150}
        height={75}
        alt="peronni pizza"
      />
      <h4 className=" font-semibold my-3 text-xl">{name}</h4>
      <p className=" text-gray-500 text-sm  w-60 mx-auto max-w-fit">
        {" "}
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.{" "}
      </p>
      <button className=" mt-5 bg-primary hover:bg-red-400 text-white px-8 py-2 rounded-full">
        Add to Cart $10{" "}
      </button>
    </div>
  );
};

export default MenuItem;
