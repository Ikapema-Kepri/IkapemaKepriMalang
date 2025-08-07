import Slider from "../../UI/Slider";
import Image from "next/image";

const KegiatanSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-16 bg-[#E5FAFF]">
      {/* <div className="container mx-auto px-6 md:px-16 lg:px-24"> */}
      <div className="text-center mb-0 md:mb-8 lg:mb-12">
        <div className="flex items-center justify-center gap-4 mb-0 md:mb-6 lg:mb-8">
          <Image
            src="/heading/HeadingKegiatan.svg"
            alt="Heading Kegiatan"
            width={454}
            height={100}
            className="h-10 md:h-20 lg:h-[75px] w-auto max-w-[90%]"
          />
        </div>
      </div>
      <Slider />
      {/* </div> */}
    </section>
  );
};

export default KegiatanSection;
