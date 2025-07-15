import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from "swiper/modules";
import clsx from "clsx"; // Make sure to install: npm install clsx

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
    title: "Kegiatan 1",
    description: "Deskripsi kegiatan 1",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Kegiatan 2",
    description: "Deskripsi kegiatan 2",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Kegiatan 3",
    description: "Deskripsi kegiatan 3",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Kegiatan 4",
    description: "Deskripsi kegiatan 4",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Kegiatan 5",
    description: "Deskripsi kegiatan 5",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Kegiatan 6",
    description: "Deskripsi kegiatan 6",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Kegiatan 7",
    description: "Deskripsi kegiatan 7",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
  {
    title: "Kegiatan 8",
    description: "Deskripsi kegiatan 8 asdasdasdasdasdasdadasfas sfasfasfasfasfafasfasfafsasf",
    image: "/LogoIkapema.svg",
    categories: ["Kategori 1", "Kategori 2"],
  },
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
  return (
    // Set up the main container with a background color and centered content
    <main className="flex items-center justify-center max-w-screen max-h-screen bg-[#E5FAFF] font-['Noto_Sans'] overflow-hidden">
      {/* Container to manage the slider's overall width */}
      <div className="w-4/5">
        <SwiperPaginationStyles />
        <Swiper
          // Swiper configuration
          modules={[Pagination]}
          grabCursor
          initialSlide={2}
          centeredSlides={true}
          slidesPerView="auto"
          speed={800}
          slideToClickedSlide
          pagination={{ clickable: true }}
          // Custom padding to give space for the active slide to grow
          className="!p-16"
          // Spacing between slides at different breakpoints
          breakpoints={{
            320: { spaceBetween: 40},
            650: { spaceBetween: 30 },
            1000: { spaceBetween: 20 },
          }}
        >
          {slideData.map((slide, index) => (
            <SwiperSlide key={index} className="!w-auto">
              {({ isActive }) => (
                <div
                  className={clsx(
                    // Base styles for all slides
                    "relative h-[500px] bg-[#7d0a0a] shadow-xl rounded-xl overflow-hidden transition-all duration-700 ease-in-out select-none",
                    {
                      // Styles for the ACTIVE slide
                      "w-[600px] max-[800px]:w-[500px] max-[650px]:w-[400px] max-[520px]:w-[300px] border-4 border-[#007A99]": isActive,
                      // Styles for INACTIVE slides
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
                        // Hide title when active, show when inactive
                        isActive ? "opacity-0 delay-[-200ms]" : "opacity-100 delay-1000"
                      )}
                    >
                      {slide.title}
                    </h1>
                  </div>

                  {/* Content shown only on the active slide */}
                  <div
                    className={clsx(
                      "absolute inset-0 z-10 p-6 flex flex-col justify-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-800",
                      // Show content when active, hide when inactive
                      isActive ? "opacity-100 delay-500" : "opacity-0"
                    )}
                  >
                    {/* Text box with description */}
                    <div
                      className={clsx(
                        "pl-3 mb-2 transition-opacity duration-500",
                        isActive ? "opacity-100 delay-1000" : "opacity-0"
                      )}
                    >
                      <p
                        className={clsx(
                          "border-l-6 border-[#007A99] pl-3 text-lg max-[650px]:text-base max-[520px]:text-sm font-light leading-relaxed transition-all duration-1000 opacity-0 translate-y-full",
                          isActive && "opacity-100 translate-y-0 delay-[0.2s]"
                        )}
                      >
                        {slide.description}
                      </p>
                    </div>

                    {/* Footer with categories */}
                    <div
                      className={clsx(
                        "absolute bottom-5 left-6 right-6 flex items-center justify-between transition-opacity",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="flex flex-wrap gap-2">
                        {slide.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className={clsx(
                              "text-white text-xs max-[650px]:text-[0.7rem] px-4 py-1.5 max-[650px]:px-2 max-[650px]:py-1 border border-white/50 rounded-full shadow-lg opacity-0",
                              // Staggered animation for each category tag on the active slide
                              isActive && "opacity-100 transition-opacity duration-800 ease-out",
                              "bg-white/20 backdrop-blur-sm"
                            )}
                            // Apply a staggered delay using arbitrary values
                            style={{
                              transitionDelay: isActive ? `${1000 + idx * 400}ms` : '0ms'
                            }}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default Slider;