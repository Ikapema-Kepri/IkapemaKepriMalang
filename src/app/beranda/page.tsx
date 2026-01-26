'use client';

import FaqSection from '../../components/beranda-section/FaqSection/FaqSection';
import HeroSctionPages from '../../components/beranda-section/HeroSection/HeroSection';
import SambutanSection from '../../components/beranda-section/SambutanSection/SambutanSection';
import TentangSection from '../../components/beranda-section/TentangSection/TentangSection';
import KegiatanSection from '../../components/beranda-section/KegiatanSection/KegiatanSection';
import EmagzSection from '@/components/beranda-section/EmagzSection/EmagzSection';
import AsramaSection from '@/components/beranda-section/AsramaSection/AsramaSection';

const Beranda: React.FC = () => {
  // Fungsi scroll smooth ke section sambutan
  const handleScrollToSambutan = () => {
    const section = document.getElementById('sambutan');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-screen bg-[#E5FAFF]">
      <section>
        <HeroSctionPages
          onButtonClick={handleScrollToSambutan}
          onScrollClick={handleScrollToSambutan}
        />
      </section>
      <section>
        <SambutanSection />
      </section>
      <section>
        <TentangSection />
      </section>
      <section>
        <AsramaSection />
      </section>
      <section>
        <KegiatanSection />
      </section>
      <section>
        <EmagzSection />
      </section>
      <section>
        <FaqSection />
      </section>
    </div>
  );
};

export default Beranda;
