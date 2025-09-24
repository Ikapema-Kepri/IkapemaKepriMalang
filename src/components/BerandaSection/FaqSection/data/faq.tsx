export interface FaqItem {
    question: string;
    answer: React.ReactNode;
}

export const faqList: FaqItem[] = [
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