import Image from "next/image";

const PengurusPage: React.FC = () => {
  return (
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
          Menjalin Visi Membangun Negeri,<br></br> Satu Untuk Semua, Semua Untuk Satu.
        </p>
      </div>
    </section>
  );
};

export default PengurusPage;
