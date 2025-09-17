import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import clsx from "clsx";
import { HiEye, HiEyeOff } from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Define the type for a single slide
interface Slide {
  title: string;
  description: string;
  image: string;
  categories: string[];
}

// Define the type for the component's props
type SliderProps = Record<string, never>;

const slideData: Slide[] = [
  {
    title: "Ikapema Goes to Kampung Budaya",
    description:
      "Ikapema Goes to Kampung Budaya merupakan wadah bagi Ikapema untuk menunjukan eksistensi budaya khas Kepulauan Riau.",
    image: "/kegiatan/KampungBudaya.svg",
    categories: ["Departemen Kominfo"],
  },
  {
    title: "I-Holiday",
    description:
      "I - Holiday atau Ikapema Holiday merupakan kegiatan liburan yang dilaksanakan bersama dengan anggota Ikapema. Tujuannya untuk memperat kekeluargaan dan melepas penat selama perkuliahan.",
    image: "/kegiatan/IkapemaHoliday.svg",
    categories: ["Agenda"],
  },
  {
    title: "I-Fest",
    description:
      "Kegiatan perlombaan futsal antar mahasiswa anggota forum daerah di Malang Raya. Kegiatan ini bertujuan mendukung gaya hidup sehat dan aktif, serta memberikan panggung bagi bakat-bakat olahraga dalam bidang futsal.",
    image: "/kegiatan/IkapemaFestival.svg",
    categories: ["Bidang Eksternal"],
  },
  {
    title: "SOTR",
    description: "Sahur On The Road (SOTR) merupakan kegiatan yang dilakukan oleh anggota Ikapema Kepri-Malang untuk melakukan aksi nyata dengan kegiatan membagikan makanan sahur kepada para pekerja malam dan kaum dhuafa di sekitar Kota Malang.",
    image: "/kegiatan/SahurOnTheRoad.svg",
    categories: ["Agenda"],
  },
  {
    title: "IPMI",
    description:
      "IPMI merupakan aksi nyata dari Ikapema Kepri-Malang untuk peduli terhadap lingkungan dengan cara menanam pohon di area yang membutuhkan penghijauan.",
    image: "/kegiatan/IkapemaPeduliBumi.svg",
    categories: ["Departemen Pengabdian Masyarakat"],
  },
  {
    title: "Final Camp",
    description:
      "Kegiatan yang dilakukan oleh anggota Asrama Ikapema Kepri-Malang untuk pengukuhan anggota baru asrama secara resmi. Kegiatan ini juga bertujuan untuk bonding dan melepas kepenatan sejenak.",
    image: "/kegiatan/FinalCamp.svg",
    categories: ["Departemen Asrama"],
  },
  {
    title: "Makrab",
    description:
      "Wadah silaturahmi untuk seluruh mahasiswa yang berasal dari Kepulauan Riau dan sedang berkuliah di Malang Raya. Di sini kita bakalan FULL HAVE FUN INCLUDE KEBERSAMAAN dengan teman-teman seperantauan!",
    image: "/kegiatan/MalamKeakraban.svg",
    categories: ["Bidang Internal"],
  },
  {
    title: "IKUMA",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/kegiatan/IkapemaPeduliSesama.svg",
    categories: ["Departemen Pengabdian Masyarakat"],
  },
  {
    title: "Ikapema Goes to School",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/kegiatan/IGS.svg",
    categories: ["Departemen Kominfo"],
  },
  {
    title: "ODI",
    description:
      "Merupakan kegiatan pendidikan dan pelatihan anggota baru Ikapema Kepri-Malang yang bertujuan untuk mengenalkan orientasi, menumbuhkan jiwa kepemimpinan dan kekeluargaan, serta meningkatkan keterampilan anggota baru dalam berbagai aspek.",
    image: "/kegiatan/ODI.svg",
    categories: ["Departemen PSDA"],
  },
  {
    title: "Ikapema Day",
    description:
      "Merupakan kegiatan olahraga tahunan yang mempertandingkan antar angkatan di Ikapema Kepri-Malang. Kegiatan ini juga bertujuan untuk mempererat kekeluargaan antar angkatan",
    image: "/kegiatan/IkapemaDay.svg",
    categories: ["Departemen Minat & Bakat"],
  },
  {
    title: "Training Organization - Pengurus Harian",
    description:
      "Kegiatan pelatihan yang diselenggarakan untuk anggota Ikapema Kepri-Malang yang terpilih menjadi Pengurus Harian. Kegiatan ini bertujuan untuk membekali para pengurus dengan pengetahuan, keterampilan, dan sikap yang diperlukan dalam menjalankan tanggung jawab mereka sebagai pemimpin organisasi.",
    image: "/kegiatan/TOPH.svg",
    categories: ["Agenda"],
  },
  {
    title: "Pelantikan Pengurus Harian",
    description:
      "Merupakan kegiatan resmi yang menandai pengukuhan dan pengesahan anggota Ikapema Kepri-Malang yang telah terpilih sebagai Pengurus Harian. Kegiatan ini bertujuan untuk memberikan legitimasi kepada para pengurus dalam menjalankan tugas dan tanggung jawab mereka selama masa jabatan.",
    image: "/kegiatan/PelantikanPH.svg",
    categories: ["Agenda"],
  },
  {
    title: "Fun Sport",
    description:
      "Agenda bulanan yang diadakan dengan tujuan untuk mengajak seluruh anggota Ikapema Kepri-Malang agar tetap aktif berolahraga dan menjaga kesehatan tubuh, serta mempererat kekeluargaan antar anggota melalui kegiatan yang menyenangkan.",
    image: "/kegiatan/FunSport.svg",
    categories: ["Departemen Minat & Bakat"],
  },
  {
    title: "Gathering",
    description:
      "Kegiatan yang diadakan untuk mempererat hubungan antar anggota Ikapema Kepri-Malang melalui berbagai aktivitas yang menyenangkan dan interaktif, sehingga tercipta suasana kekeluargaan yang hangat dan solid di antara seluruh anggota.",
    image: "/kegiatan/Gathering.svg",
    categories: ["PSDA"],
  }
];

// Component to style Swiper's globally injected pagination classes
const SwiperPaginationStyles = () => (
  <style>{`
    .swiper-pagination-bullet {
      @apply w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full bg-[#0d6efd];
    }
    .swiper-pagination-bullet-active {
      @apply w-4 sm:w-5 md:w-6 lg:w-8 rounded-2xl bg-[#6c757d] transition-all duration-700 ease-in-out;
    }
    .swiper-pagination {
      @apply bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12;
    }
  `}</style>
);

const Slider: React.FC<SliderProps> = () => {
  const [hideContentIndex, setHideContentIndex] = useState<number | null>(null);

  return (
    <main className="flex items-center justify-center max-w-screen max-h-screen bg-[#E5FAFF] font-['Noto_Sans'] overflow-hidden">
      <div className="w-full sm:w-full md:w-11/12 lg:w-11/12 xl:w-10/12">
        <SwiperPaginationStyles />
        <Swiper
          modules={[Pagination]}
          grabCursor
          initialSlide={Math.floor(slideData.length / 2)}
          centeredSlides={true}
          slidesPerView="auto"
          speed={800}
          slideToClickedSlide
          pagination={{ clickable: true }}
          loop={true}
          className="!pb-12 !pt-4 !px-4 sm:!pb-16 sm:!pt-6 sm:!px-6 md:!pb-20 md:!pt-8 md:!px-8 lg:!pb-24 lg:!pt-10 lg:!px-10 xl:!pb-28 xl:!pt-12 xl:!px-12"
          breakpoints={{
            320: { spaceBetween: 16 },
            480: { spaceBetween: 20 },
            640: { spaceBetween: 24 },
            768: { spaceBetween: 28 },
            1024: { spaceBetween: 32 },
            1280: { spaceBetween: 24 },
          }}
        >
          {slideData.map((slide, index) => (
            <SwiperSlide key={index} className="!w-auto">
              {({ isActive }) => {
                const isHide = hideContentIndex === index;
                return (
                  <div
                    className={clsx(
                      "relative bg-[#005266] shadow-xl rounded-xl overflow-hidden transition-all duration-700 ease-in-out select-none",
                      {
                        // Active: 16:9 ratio with border
                        "w-[320px] h-[180px] sm:w-[384px] sm:h-[216px] md:w-[480px] md:h-[270px] lg:w-[576px] lg:h-[324px] xl:w-[110.708vh] xl:h-[62.273vh] border-2 sm:border-3 md:border-3 lg:border-4 border-[#007A99]":
                          isActive,
                        // Inactive: Same height as active but narrower width
                        "w-[240px] h-[180px] sm:w-[288px] sm:h-[216px] md:w-[360px] md:h-[270px] lg:w-[432px] lg:h-[324px] xl:w-[83.031vh] xl:h-[62.273vh]": !isActive,
                      }
                    )}
                  >
                    {/* Slide Image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={clsx(
                        "absolute inset-0 w-full h-full object-cover transition-all duration-1000",
                        isActive ? "grayscale-0" : "grayscale-[90%]"
                      )}
                    />

                    {/* Title shown on inactive slides */}
                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 lg:p-[3.295vh]">
                      <h1
                        className={clsx(
                          "text-xs sm:text-sm md:text-base lg:text-[2.965vh] xl:text-[3.295vh] font-bold text-white transition-opacity duration-800",
                          isActive
                            ? "opacity-0 delay-[-200ms]"
                            : "opacity-100 delay-1000"
                        )}
                      >
                        {slide.title}
                      </h1>
                    </div>

                    {/* Content shown only on the active slide */}
                    <div
                      className={clsx(
                        "absolute inset-0 z-10 p-2 sm:p-3 md:p-4 lg:p-[3.295vh] flex flex-col justify-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-800",
                        isActive && !isHide
                          ? "opacity-100 delay-500"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {/* Title on active slide */}
                      {isActive && !isHide && (
                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[3.954vh] font-bold mb-1 sm:mb-2 md:mb-[1.977vh] text-white drop-shadow-lg transition-all duration-700 absolute top-2 sm:top-3 md:top-4 lg:top-[3.295vh] left-2 sm:left-3 md:left-4 lg:left-5 right-2 sm:right-3 md:right-4 lg:right-5 z-20">
                          {slide.title}
                        </h1>
                      )}

                      {/* Description */}
                      <div
                        className={clsx(
                          "absolute left-2 sm:left-3 md:left-4 lg:left-5 right-2 sm:right-3 md:right-4 lg:right-5",
                          // Adjusted margin tops for 16:9 ratio
                          "mt-6 sm:mt-8 md:mt-10 lg:mt-[1.977vh] xl:mt-[9.226vh]",
                          "transition-opacity duration-500",
                          isActive && !isHide
                            ? "opacity-100 delay-1000"
                            : "opacity-0"
                        )}
                      >
                        <p
                          className={clsx(
                            "border-l-2 sm:border-l-3 md:border-l-4 lg:border-l-5 border-[#007A99] pl-1 sm:pl-2 md:pl-3 mr-4 sm:mr-6 md:mr-8 lg:mr-10",
                            "text-[0.65rem] sm:text-xs md:text-sm lg:text-base xl:text-lg font-light leading-relaxed",
                            "transition-all duration-1000 opacity-0 translate-y-4",
                            isActive &&
                              !isHide &&
                              "opacity-100 translate-y-0 delay-[0.2s]"
                          )}
                        >
                          {slide.description}
                        </p>
                      </div>

                      {/* Footer with categories */}
                      <div
                        className={clsx(
                          "absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 left-2 sm:left-3 md:left-4 lg:left-5 right-2 sm:right-3 md:right-4 lg:right-5 flex items-center justify-between transition-opacity",
                          isActive && !isHide ? "opacity-100" : "opacity-0"
                        )}
                      >
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                          {slide.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className={clsx(
                                "text-white text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-[2.306vh]",
                                "px-1 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 lg:px-[2.636vh] lg:py-[0.988vh]",
                                "border border-white/50 rounded-full shadow-lg opacity-0",
                                isActive &&
                                  !isHide &&
                                  "opacity-100 transition-opacity duration-800 ease-out",
                                "bg-white/20 backdrop-blur-sm"
                              )}
                              style={{
                                transitionDelay:
                                  isActive && !isHide
                                    ? `${1000 + idx * 400}ms`
                                    : "0ms",
                              }}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Toggle button for active slide */}
                    {isActive && (
                      <button
                        type="button"
                        onClick={() =>
                          setHideContentIndex(isHide ? null : index)
                        }
                        className={clsx(
                          "absolute top-1 sm:top-2 md:top-3 lg:top-4 right-1 sm:right-2 md:right-3 lg:right-4 z-20",
                          "px-1 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2",
                          "rounded-md sm:rounded-lg bg-black/60 text-white text-[0.6rem] sm:text-xs md:text-sm font-semibold shadow transition hover:bg-black/80 flex items-center justify-center",
                          "backdrop-blur"
                        )}
                        aria-label={
                          isHide ? "Tampilkan Info" : "Sembunyikan Info"
                        }
                      >
                        {isHide ? (
                          <HiEye className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                        ) : (
                          <HiEyeOff className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                        )}
                      </button>
                    )}
                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default Slider;
