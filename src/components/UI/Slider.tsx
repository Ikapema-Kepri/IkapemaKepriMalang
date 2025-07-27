import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import clsx from "clsx";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Tambahkan ini di bagian import

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
      @apply w-4 h-4 rounded-full bg-[#0d6efd];
    }
    .swiper-pagination-bullet-active {
      @apply w-8 rounded-2xl bg-[#6c757d] transition-all duration-700 ease-in-out;
    }
  `}</style>
);

const Slider: React.FC<SliderProps> = () => {
  const [hideContentIndex, setHideContentIndex] = useState<number | null>(null);

  return (
    <main className="flex items-center justify-center max-w-screen max-h-screen bg-[#E5FAFF] font-['Noto_Sans'] overflow-hidden">
      <div className="w-4/5">
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
          className="!p-16"
          breakpoints={{
            320: { spaceBetween: 40 },
            650: { spaceBetween: 30 },
            1000: { spaceBetween: 20 },
          }}
        >
          {slideData.map((slide, index) => (
            <SwiperSlide key={index} className="!w-auto">
              {({ isActive }) => {
                const isHide = hideContentIndex === index;
                return (
                  <div
                    className={clsx(
                      "relative h-[450px] bg-[#005266] shadow-xl rounded-xl overflow-hidden transition-all duration-700 ease-in-out select-none",
                      {
                        "w-[720px] max-[800px]:w-[500px] max-[650px]:w-[400px] max-[520px]:w-[300px] border-4 border-[#007A99]":
                          isActive,
                        "w-[300px]": !isActive,
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
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h1
                        className={clsx(
                          "text-3xl font-bold text-white transition-opacity duration-800",
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
                        "absolute inset-0 z-10 p-6 flex flex-col justify-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-800",
                        isActive && !isHide
                          ? "opacity-100 delay-500"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {/* Title on active slide - posisinya fixed di atas */}
                      {isActive && !isHide && (
                        <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-lg transition-all duration-700 absolute top-6 left-6 right-6 z-20">
                          {slide.title}
                        </h1>
                      )}

                      {/* Description - diberi margin top agar selalu di bawah title, dan absolute supaya tidak terdorong ke bawah */}
                      <div
                        className={clsx(
                          "absolute left-6 right-6",
                          // mt-[72px] agar selalu di bawah title (mb-4 pada title = 1rem + 2.25rem font = ~3.25rem)
                          "mt-[72px]",
                          "transition-opacity duration-500",
                          isActive && !isHide
                            ? "opacity-100 delay-1000"
                            : "opacity-0"
                        )}
                      >
                        <p
                          className={clsx(
                            "border-l-6 border-[#007A99] pl-3 mr-12 text-base max-[650px]:text-base max-[520px]:text-sm font-light leading-relaxed transition-all duration-1000 opacity-0 translate-y-4",
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
                          "absolute bottom-5 left-6 right-6 flex items-center justify-between transition-opacity",
                          isActive && !isHide ? "opacity-100" : "opacity-0"
                        )}
                      >
                        <div className="flex flex-wrap gap-2">
                          {slide.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className={clsx(
                                "text-white text-xs max-[650px]:text-[0.7rem] px-4 py-1.5 max-[650px]:px-2 max-[650px]:py-1 border border-white/50 rounded-full shadow-lg opacity-0",
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
                          "absolute top-4 right-4 z-20 px-4 py-2 rounded-lg bg-black/60 text-white text-sm font-semibold shadow transition hover:bg-black/80 flex items-center justify-center",
                          "backdrop-blur"
                        )}
                        aria-label={
                          isHide ? "Tampilkan Info" : "Sembunyikan Info"
                        }
                      >
                        {isHide ? (
                          <HiEye className="w-6 h-6" />
                        ) : (
                          <HiEyeOff className="w-6 h-6" />
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
