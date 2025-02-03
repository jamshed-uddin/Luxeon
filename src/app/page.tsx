// import AboutUs from "@/components/homepage/AboutUs";
// import FAQs from "@/components/homepage/FAQs";
import Hero from "@/components/homepage/Hero";
// import OurCategories from "@/components/homepage/OurCategories";
// import OurProducts from "@/components/homepage/OurProducts";

export default async function Home() {
  return (
    <div className="-mt-16 space-y-14 lg:space-y-20 hide-scrollbar ">
      <Hero />
      {/* <OurProducts />
      <AboutUs />
      <OurCategories />
      <FAQs /> */}
    </div>
  );
}
