'use client';

import FaqSection from '../../components/BerandaSection/FaqSection/FaqSection';
import HeroSctionPages from '../../components/BerandaSection/HeroSection/HeroSection';
import SambutanSection from '../../components/BerandaSection/SambutanSection/SambutanSection';
import TentangSection from '../../components/BerandaSection/TentangSection/TentangSection';
import KegiatanSection from '../../components/BerandaSection/KegiatanSection/KegiatanSection';

const Beranda: React.FC = () => {
  return (
    <div className="bg-[#E5FAFF]">
      <section className="">
          <HeroSctionPages />
        </section>
        <section className="">
          <SambutanSection />
        </section> 
        <section>
          <TentangSection />
        </section>
        <section>
          <KegiatanSection />
        </section>
        <section>
          <FaqSection />
        </section>
    </div>
  );
};

export default Beranda;
