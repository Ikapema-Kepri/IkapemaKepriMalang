'use client';

import FaqSection from '../../components/BerandaSection/FaqSection/FaqSection';
import HeroSctionPages from '../../components/BerandaSection/HeroSection/HeroSection';
import SambutanSection from '../../components/BerandaSection/SambutanSection/SambutanSection';
import TentangSection from '../../components/BerandaSection/TentangSection/TentangSection';
import KegiatanSection from '../../components/BerandaSection/KegiatanSection/KegiatanSection';

const Beranda: React.FC = () => {
  // Fungsi scroll smooth ke section sambutan
  const handleScrollToSambutan = () => {
    const section = document.getElementById('sambutan');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#E5FAFF]">
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
        <KegiatanSection />
      </section>
      <section>
        <FaqSection />
      </section>
    </div>
  );
};

export default Beranda;
