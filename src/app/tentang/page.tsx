import FilosofiLogoCard from "@/components/UI/FilosofiLogoCard";
import Image from "next/image";

const PengurusPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full py-16 sm:py-20 md:py-32 lg:py-42 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#E5FAFF]"
        style={{
          backgroundImage: "url('/bg/BgTentang.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center mb-8 md:mb-12">
          {/* Heading Image */}
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <Image
              src="/heading/HeadingTentang2.svg"
              alt="Heading Tentang"
              width={454}
              height={100}
              className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-[75px] w-auto max-w-[90%]"
            />
          </div>

          {/* Title Text */}
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-7xl font-extrabold text-[#00A3CC] mb-4 sm:mb-6 leading-tight">
            IKAPEMA <br />KEPRI—MALANG
          </h1>

          {/* Subtitle Text */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-[#007A99] leading-relaxed px-2 sm:px-4">
            Menjalin Visi Membangun Negeri,<br />
            Satu Untuk Semua, Semua Untuk Satu.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-28 xl:py-32 px-12 sm:px-14 md:px-16 lg:px-16 xl:px-32 bg-[#E5FAFF]">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Logo Container */}
          <div className="w-full lg:w-2/5 flex justify-center items-center">
            <div className="relative flex justify-center items-center">
              <Image
                src="/LogoIKAPEMA.svg"
                alt="IKAPEMA KEPRI MALANG Logo"
                width={500}
                height={500}
                className="object-contain w-30 h-30 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px]"
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="w-full lg:w-3/5">
            <p className="text-[#007A99] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-justify">
              Ikatan Pelajar Mahasiswa Kepulauan Riau-Malang (IKAPEMA Kepri-Malang)
              adalah organisasi pelajar dan mahasiswa daerah Provinsi Kepulauan Riau
              yang ada di Kota Malang. Organisasi ini berlandaskan Pancasila dan UUD
              RI 1945 dan berasaskan kekeluargaan serta bersifat kerukunan,
              kependidikan, dan kemasyarakatan. Tujuan dibentuknya organisasi ini
              adalah untuk menumbuhkan kesadaran, kecakapan, kecerdasan dan
              persaudaraan, serta tanggung jawab anggota sebagai bentuk pengabdian
              kepada daerah, bangsa dan negara. Anggota IKAPEMA Kepri-Malang
              terdiri atas anggota biasa, luar biasa dan kehormatan.
            </p>
          </div>
        </div>
      </section>

      {/* Filosofi Logo Section */}
      <section className="relative w-full py-16 sm:py-24 md:py-32 lg:py-36 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-32 bg-[#E7FAFF]">
        <div className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-36">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8">
            <Image
              src="/heading/HeadingFilosofiLogo.svg"
              alt="Heading Filosofi Logo"
              width={454}
              height={100}
              className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-[75px] w-auto max-w-[90%]"
            />
          </div>
        </div>
        <FilosofiLogoCard />
      </section>

      
    </>
  );
};

export default PengurusPage;
