"use client";

import FaqCard from "../../UI/FaqCard";
import Image from "next/image";

const faqList = [
  {
    question: "Bagaimana cara bergabung dengan IKAPEMA KEPRI?",
    answer: (
      <>
        Cukup hubungi pengurus dan tunjukkan{" "}
        <strong>bukti menempuh pendidikan</strong> di Kota Malang. Informasi
        lebih lanjut bisa dilihat di media sosial resmi IKAPEMA KEPRI.
      </>
    ),
  },
  {
    question: "Bagaimana cara menjadi anggota House of IKAPEMA?",
    answer: (
      <>
        Mahasiswa/mahasiswi asal Kepulauan Riau yang menempuh pendidikan di
        Malang dapat <strong>menghubungi pengurus</strong> melalui media sosial
        resmi IKAPEMA KEPRI untuk informasi lebih lanjut.
      </>
    ),
  },
  {
    question: "Apa saja kegiatan rutin IKAPEMA KEPRI?",
    answer: (
      <>
          Kegiatan rutin meliputi <strong>Pengabdian Masyarakat</strong>, <strong>Kebudayaan</strong>, <strong>Olahraga</strong>, dan
          <strong> berbagai acara kebersamaan antar anggota.</strong>
      </>
    ),
  },
  {
    question: "Siapa saja yang bisa menjadi anggota?",
    answer: (
      <>
        Semua pelajar dan mahasiswa asal Kepulauan Riau yang <strong>sedang menempuh pendidikan di Malang</strong>dapat menjadi anggota.
      </>
    ),
  },
];

const FaqSection = () => {
  return (
    <section className="flex px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 flex-col items-center gap-4 md:gap-6 ls:md-8 py-16">
      <div className="text-center mb-4 md:mb-8 lg:mb-12">
        <div className="flex items-center justify-center gap-4 mb-4 md:mb-6 lg:mb-8">
          <Image
            src="/heading/HeadingFAQ.svg"
            alt="Heading Kegiatan"
            width={454}
            height={100}
            className="h-10 md:h-20 lg:h-[75px] w-auto max-w-[90%]"
          />
        </div>
      </div>
      {faqList.map((faq, idx) => (
        <FaqCard key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  );
};

export default FaqSection;
