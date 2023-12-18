
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className=" text-center my-16">
        <SectionHeader subHeader={"Our Story "} mainHeader={"About Us"} />
        <div className=" text-gray-500  mx-auto max-w-lg mt-4 flex flex-col gap-4">
          <p className="  ">
            {" "}
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable
          </p>
          <p className="   ">
            {" "}
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable
          </p>
          <p>There are many variations of passages of.</p>
        </div>
      </section>
      <section className=" text-center my-16">
        <SectionHeader subHeader={"Don't hesihate"} mainHeader={"Contact Us"} />
        <div className=" mt-8">
          <Link href="" className="text-4xl underline text-gray-600">
            +90 212 156 712
          </Link>
        </div>
      </section>
    </>
  );
}
