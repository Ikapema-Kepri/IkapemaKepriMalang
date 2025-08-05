import FilosofiLogoCard from "@/components/UI/FilosofiLogoCard";
import Image from "next/image";

const PengurusPage: React.FC = () => {
  return (
    <>
      <section
        className="relative w-full py-42 px-6 md:px-16 lg:px-16 bg-[#E5FAFF]"
        style={{
          backgroundImage: "url('/bg/BgTentang.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Image
              src="/heading/HeadingTentang2.svg"
              alt="Heading Tentang"
              width={454}
              height={100}
              className="h-10 md:h-20 lg:h-[100px] w-auto max-w-[90%]"
            />
          </div>

          {/* Title Text */}
          <h1 className="text-8xl font-extrabold text-[#00A3CC] mb-6">
            IKAPEMA <br></br>KEPRI—MALANG
          </h1>

          {/* Subtitle Text */}
          <p className="text-4xl font-medium text-[#007A99]">
            Menjalin Visi Membangun Negeri,<br></br> Satu Untuk Semua, Semua
            Untuk Satu.
          </p>
        </div>
      </section>
      <section className="flex relative w-full py-42 px-6 md:px-16 lg:px-32 bg-[#E5FAFF] gap-6">
        <div className="flex w-2/5 flex-row justify-center items-center text-center mb-4">
          <div className="w-50 h-50 md:w-72 md:h-72 lg:w-100 lg:h-100 relative flex justify-center items-center">
            <Image
              src="/LogoIKAPEMA.svg" // Replace with your logo path
              alt="IKAPEMA KEPRI MALANG Logo"
              width={500}
              height={500}
              className="object-contain h-50 w-50 md:h-72 md:w-72 lg:h-[500px] lg:w-[500px]"
            />
          </div>
        </div>
        <h1 className="w-3/5 text-[#007A99] text-xl md:text-2xl leading-relaxed text-justify">
          Ikatan Pelajar Mahasiswa Kepulauan Riau-Malang (IKAPEMA Kepri-Malang)
          adalah organisasi pelajar dan mahasiswa daerah Provinsi Kepulauan Riau
          yang ada di Kota Malang. Organisasi ini berlandaskan Pancasila dan UUD
          RI 1945 dan berasaskan kekeluargaan serta bersifat kerukunan,
          kependidikan, dan kemasyarakatan. Tujuan dibentuknya organisasi ini
          adalah untuk menumbuhkan kesadaran, kecakapan, kecerdasan dan
          persaudaraan,serta tanggung jawab anggota sebagai bentuk pengabdian
          kepada daerah, bangsa dan negara. Anggota IKAPEMA Kepri-Malang
          terdiriatas anggota biasa, luar biasa dan kehormatan.
        </h1>
      </section>
      <section className="relative w-full py-56 px-6 md:px-16 lg:px-32 bg-[#E7FAFF]">
        <div className="text-center mb-36">
          <div className="flex items-center justify-center gap-8 mb-8">
            <Image
              src="/heading/HeadingFilosofiLogo.svg"
              alt="Heading Tentang"
              width={454}
              height={100}
              className="h-10 md:h-20 lg:h-[100px] w-auto max-w-[90%]"
            />
          </div>
        </div>
        <FilosofiLogoCard title={""} logoUrl={""} description={""}/>
      </section>
      <section className="relative w-full py-42 px-6 md:px-16 lg:px-16 bg-[#E9FAFF]">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Image
              src="/heading/HeadingFilosofiWarna.svg"
              alt="Heading Tentang"
              width={454}
              height={100}
              className="h-10 md:h-20 lg:h-[100px] w-auto max-w-[90%]"
            />
          </div>
    
        </div>
      </section>
    </>
  );
};

export default PengurusPage;
