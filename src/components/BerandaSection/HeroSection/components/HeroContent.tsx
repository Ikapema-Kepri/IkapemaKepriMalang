import React, { memo, useCallback } from "react";
import { MoveRight } from "lucide-react";
import ShinyText from "../../../UI/ShinyText";
import FadeContent from "../../../UI/FadeContent";

interface HeroContentProps {
  title: string;
  subtitle: React.ReactNode;
  buttonText: string;
  onButtonClick?: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ title, subtitle, buttonText, onButtonClick }) => {
  const handleButtonClick = useCallback(() => {
    onButtonClick?.();
  }, [onButtonClick]);

  return (
    <div className="relative z-20 text-center px-4 sm:px-6 lg:px-[5.728vh] max-w-4xl mx-auto w-full">
      <FadeContent duration={2000} delay={200} repeatAnimation={false} isVisible={true}>
        <ShinyText
          text={title}
          speed={3}
          className="font-londona text-2xl sm:text-4xl md:text-5xl lg:text-[10.74vh] font-semibold mb-6 sm:mb-[5.728vh] tracking-wide"
        />
      </FadeContent>

      <FadeContent duration={1500} delay={500} repeatAnimation={false} isVisible={true}>
        <div className="max-w-[80%] mx-auto text-sm sm:text-lg md:text-xl lg:text-[4.296vh] mb-3 sm:mb-[2.864vh] font-light opacity-90">
          <i>{subtitle}</i>
        </div>
        <button
          onClick={handleButtonClick}
          type="button"
          className="inline-flex items-center gap-2 sm:gap-3 bg-white text-[#007A99] px-6 sm:px-8 py-2 sm:py-3 mt-6 sm:mt-8 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl will-change-transform"
        >
          {buttonText}
          <MoveRight size={16} className="sm:w-5 sm:h-5" />
        </button>
      </FadeContent>
    </div>
  );
};

export default memo(HeroContent);