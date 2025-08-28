import AboutUs from "@/components/aobut-us/AboutUs";
import HeroSlider from "@/components/banner/HeroSlider";
import ChooseUsSection from "@/components/choose-us/ChooseUs";
import ContactInfo from "@/components/contact-info/ContactInfo";
import TeamSection from "@/components/out-team/OurTeam";
import ServiceArea from "@/components/service/Service";
import TestimonialSection from "@/components/testimonial/Testimonial";
export default function Home() {
  return (
    <div>
      <HeroSlider />
      <AboutUs />
      <ServiceArea />
      <ContactInfo />
      <TeamSection/>
      <ChooseUsSection/>
      <TestimonialSection/>
    </div>
  );
}
