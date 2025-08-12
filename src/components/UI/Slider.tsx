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
    title: "Kampung Budaya",
    description:
      "Kampung Budaya dari Universitas Brawijaya atau yang lebih dikenal dengan KamBud merupakan wadah untuk meneruskan warisan budaya Indonesia. Kambud ini sendiri sering diikuti oleh Ikapema-Kepri Malang.",
    image: "/kegiatan/KampungBudaya.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "I-Holiday",
    description:
      "I - Holiday atau Ikapema Holiday merupakan kegiatan jalan-jalan bareng yang dilaksanakan untuk para anggota Ikapema tujuannya untuk bonding dan melepas penat setelah kuliah.",
    image: "/kegiatan/IkapemaHoliday.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "I-Fest",
    description:
      "kegiatan perlombaan Futsal antar mahasiswa anggota forum daerah di Malang Raya dengan tujuan untuk mempererat ikatan sosial antara mahasiswa dari berbagai perguruan tinggi yang tergabung dalam forum mahasiswa daerah di Malang Raya. Kegiatan ini juga bertujuan mendukung gaya hidup sehat dan aktif, serta memberikan panggung bagi bakat-bakat olahraga dalam bidang futsal.",
    image: "/kegiatan/IkapemaFestival.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "SOTR",
    description: "SAHU",
    image: "/kegiatan/SahurOnTheRoad.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "IPMI",
    description:
      "Kegiatan yang dilakukan oleh anggota Ikapema Kepri-Malang untuk melakukan aksi nyata dengan kegiatan menanam pohon sebagai bentuk kepedulian terhadap bumi",
    image: "/kegiatan/IkapemaPeduliBumi.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Final Camp",
    description:
      "Kegiatan yang dilakukan oleh anggota Asrama Ikapema Kepri-Malang untuk pengukuhan anggota baru asrama secara resmi dan juga untuk bonding bersama dan melepas kepenatan sejenak.",
    image: "/kegiatan/FinalCamp.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Makrab",
    description:
      "Wadah silaturahmi untuk seluruh mahasiswa yang berasal dari Kepulauan Riau dan sedang berkuliah di Malang Raya. Di sini kita bakalan FULL HAVE FUN INCLUDE KEBERSAMAAN dengan teman-teman seperantauan!",
    image: "/kegiatan/MalamKeakraban.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "IKUMA",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/kegiatan/IkapemaPeduliSesama.png",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Ikapema Goes to School",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "ODI",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Ikapema Day",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "TO-PH",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Pelantikan Pengurus Harian",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Fun Sport",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Gathering",
    description:
      "Bertujuan untuk bersama-sama meningkatkan kepedulian terhadap sesama masyarakat yang kurang beruntung dengan cara saling berbagi kebahagiaan serta dapat menumbuhkan rasa bersyukur",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
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
      <div className="w-full sm:w-11/12 md:w-4/5 lg:w-4/5">
        <SwiperPaginationStyles />
        <Swiper
          modules={[Pagination]}
          grabCursor
          initialSlide={2}
          centeredSlides={true}
          slidesPerView="auto"
          speed={800}
          slideToClickedSlide
          pagination={{ clickable: true }}
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
                      // Responsive heights
                      "h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px]",
                      {
                        // Active widths - fully responsive
                        "w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[576px] border-2 sm:border-3 md:border-3 lg:border-4 border-[#007A99]":
                          isActive,
                        // Inactive widths - responsive
                        "w-[160px] sm:w-[200px] md:w-[240px] lg:w-[260px] xl:w-[280px]": !isActive,
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
                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 lg:p-5">
                      <h1
                        className={clsx(
                          "text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-white transition-opacity duration-800",
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
                        "absolute inset-0 z-10 p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-800",
                        isActive && !isHide
                          ? "opacity-100 delay-500"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {/* Title on active slide */}
                      {isActive && !isHide && (
                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 md:mb-3 text-white drop-shadow-lg transition-all duration-700 absolute top-2 sm:top-3 md:top-4 lg:top-5 left-2 sm:left-3 md:left-4 lg:left-5 right-2 sm:right-3 md:right-4 lg:right-5 z-20">
                          {slide.title}
                        </h1>
                      )}

                      {/* Description */}
                      <div
                        className={clsx(
                          "absolute left-2 sm:left-3 md:left-4 lg:left-5 right-2 sm:right-3 md:right-4 lg:right-5",
                          // Responsive margin tops
                          "mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16",
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
                                "text-white text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm",
                                "px-1 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 lg:px-4 lg:py-1.5",
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
