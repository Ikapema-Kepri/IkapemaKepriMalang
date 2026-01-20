import React, { memo, useMemo } from "react";
import QuoteIcon from "../../../UI/quotesIcon";
import BlurText from "../../../UI/blur-text";
import FadeContent from "../../../UI/fade-content"; // Asumsi FadeContent ada di folder UI

const SambutanText = memo(({ isVisible }: { isVisible: boolean }) => {
  const textContainerClasses = useMemo(
    () =>
      `w-full md:w-1/2 lg:w-3/5 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
      }`,
    [isVisible]
  );

  return (
    <div className={textContainerClasses}>
      <FadeContent delay={200} isVisible={isVisible}>
        <QuoteIcon />
      </FadeContent>
      <FadeContent delay={400} isVisible={isVisible}>
        <BlurText
          text="Selamat datang kami ucapkan untuk seluruh keluarga besar IKAPEMA Kepri—Malang. Dengan bangga kami persembahkan situs resmi website IKAPEMA kepada seluruh masyarakat khususnya keluarga besar IKAPEMA. Sebagai pengurus kami berkomitmen untuk senantiasa menjaga organisasi daerah ini untuk memperkuat silaturahmi, memfasilitasi pengembangan potensi anggota dan meningkatkan kesadaran sosial. Dalam website ini akan ditemukan informasi terkait program, kegiatan dan perkembangan dari IKAPEMA Kepri—Malang. Kami juga membuka peluang untuk berbagai ide, pengalaman dan kreativitas. Terimakasih atas kunjungan anda. Menjalin Visi Membangun Negeri, Satu Untuk Semua, Semua Untuk Satu."
          delay={50}
          animateBy="words"
          direction="top"
          className="w-full my-[2.636vh] text-gray-600 leading-relaxed text-center text-base sm:text-lg md:text-[3.295vh]"
        />
      </FadeContent>
      <FadeContent delay={600} isVisible={isVisible}>
        <div className="flex justify-end">
          <QuoteIcon className="transform -scale-x-100 -scale-y-100" />
        </div>
      </FadeContent>
    </div>
  );
});

SambutanText.displayName = "SambutanText";
export default SambutanText;