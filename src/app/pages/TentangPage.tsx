import React from 'react';
import Image from 'next/image';

const TentangPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#E5FAFF] text-gray-800">
        <section className="py-16 px-4 md:px-24">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">Tentang IKAPEMA KEPRI—MALANG</h1>
            <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
            IKAPEMA KEPRI—MALANG adalah sebuah wadah berlandaskan kekeluargaan bagi mahasiswa Kepulauan Riau yang berada di Kota Malang. Kami berkomitmen untuk menciptakan lingkungan yang inklusif, mendukung, dan memfasilitasi pengembangan diri serta kebersamaan antar anggota.
            </p>
            <div className="flex justify-center">
            <Image src="/LogoIkapema.svg" alt="Logo IKAPEMA" width={70} height={70} className="md:h-[90px] md:w-[90px]" />
            </div>
        </section>
        </div>
    );
};

export default TentangPage;