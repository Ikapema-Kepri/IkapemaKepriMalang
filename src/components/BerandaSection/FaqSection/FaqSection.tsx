'use client';

import FaqCard from "../../UI/FaqCard";
import Image from "next/image";

const faqList = [
  {
    question: "Apa itu IKAPEMA KEPRI?",
    answer: "IKAPEMA KEPRI adalah Ikatan Pelajar Mahasiswa Kepulauan Riau di Malang yang bertujuan mempererat silaturahmi dan membantu mahasiswa baru.",
  },
  {
    question: "Bagaimana cara bergabung dengan IKAPEMA KEPRI?",
    answer: "Cukup hubungi pengurus atau datang ke acara kami. Informasi lebih lanjut bisa dilihat di media sosial resmi IKAPEMA KEPRI.",
  },
  {
    question: "Apa saja kegiatan rutin IKAPEMA KEPRI?",
    answer: "Kegiatan rutin meliputi pengenalan kampus, seminar, bakti sosial, dan berbagai acara kebersamaan antar anggota.",
  },
  {
    question: "Siapa saja yang bisa menjadi anggota?",
    answer: "Semua pelajar dan mahasiswa asal Kepulauan Riau yang sedang menempuh pendidikan di Malang dapat menjadi anggota.",
  },
];

const FaqSection = () => {
  return (
    <section className="flex px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 flex-col items-center gap-4 md:gap-6 ls:md-8 py-16">
      <div className="text-center mb-4 md:mb-8 lg:mb-12">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Image
                  src="/heading/HeadingFAQ.svg"
                  alt="Heading Kegiatan"
                  width={454}
                  height={100}
                  className="h-10 md:h-20 lg:h-[80px] w-auto max-w-[90%]"
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