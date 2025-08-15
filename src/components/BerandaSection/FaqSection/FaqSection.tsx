"use client";

import FaqCard from "../../UI/FaqCard";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
				Kegiatan rutin meliputi <strong>Pengabdian Masyarakat</strong>,{" "}
				<strong>Kebudayaan</strong>, <strong>Olahraga</strong>, dan
				<strong> berbagai acara kebersamaan antar anggota.</strong>
			</>
		),
	},
	{
		question: "Siapa saja yang bisa menjadi anggota?",
		answer: (
			<>
				Semua pelajar dan mahasiswa asal Kepulauan Riau yang{" "}
				<strong>sedang menempuh pendidikan di Malang</strong> dapat menjadi
				anggota.
			</>
		),
	},
];

const FaqSection = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const faqListRef = useRef<HTMLDivElement>(null);

	const isHeaderInView = useInView(headerRef, {
		once: false, // Animasi terjadi setiap kali
		margin: "0px 0px -100px 0px",
		amount: 0.3, // 30% element harus terlihat untuk trigger
	});

	const isFaqListInView = useInView(faqListRef, {
		once: false, // Animasi terjadi setiap kali
		margin: "0px 0px -100px 0px",
		amount: 0.2, // 20% element harus terlihat untuk trigger
	});

	return (
		<section className="flex px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 flex-col items-center gap-4 md:gap-6 lg:gap-8 py-16">
			{/* Header Section */}
			<div className="text-center ">
				<div
					ref={headerRef}
					className={`flex items-center justify-center gap-4 mb-4 md:mb-6 lg:mb-8 transition-all duration-1000 ease-out ${
						isHeaderInView
							? "opacity-100 translate-y-0 scale-100"
							: "opacity-0 translate-y-8 scale-95"
					}`}
				>
					<Image
						src="/heading/HeadingFAQ.svg"
						alt="Heading FAQ"
						width={454}
						height={100}
						className="h-13 md:h-22 lg:h-[75px] w-auto max-w-[90%]"
					/>
				</div>
			</div>

			{/* FAQ Cards Section */}
			<div
				ref={faqListRef}
				className={`w-full flex flex-col items-center gap-4 md:gap-6 transition-all duration-1200 ease-out ${
					isFaqListInView
						? "opacity-100 translate-x-0"
						: "opacity-0 translate-x-12"
				}`}
			>
				{faqList.map((faq, idx) => (
					<div
						key={idx}
						className={`w-full transition-all duration-800 ease-out ${
							isFaqListInView
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-6"
						}`}
						style={{
							transitionDelay: isFaqListInView ? `${idx * 100}ms` : "0ms",
						}}
					>
						<FaqCard question={faq.question} answer={faq.answer} />
					</div>
				))}
			</div>
		</section>
	);
};

export default FaqSection;
