'use client';

import FaqSection from '../../components/beranda-section/FaqSection/FaqSection';
import HeroSctionPages from '../../components/beranda-section/HeroSection/HeroSection';
import SambutanSection from '../../components/beranda-section/SambutanSection/SambutanSection';
import TentangSection from '../../components/beranda-section/TentangSection/TentangSection';
import KegiatanSection from '../../components/beranda-section/KegiatanSection/KegiatanSection';


const BerandaPage: React.FC = () => {
  return (
    <div>
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

export default BerandaPage;
