import React, { memo, useCallback } from "react";
import { MoveDown } from "lucide-react";
import FadeContent from "../../../UI/FadeContent";

interface ScrollIndicatorProps {
  onScrollClick?: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onScrollClick }) => {
  const handleScrollClick = useCallback(() => {
    onScrollClick?.();
  }, [onScrollClick]);

  return (
    <div className="absolute bottom-8 sm:bottom-[7.908vh] left-1/2 transform -translate-x-1/2 z-20">
      <FadeContent duration={1500} delay={1000} repeatAnimation={false} isVisible={true}>
        <button
          onClick={handleScrollClick}
          type="button"
          className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity duration-300 group"
          aria-label="Scroll to content"
        >
          <span className="text-xs sm:text-[2.306vh] mb-[1.318vh] font-light">Our Information</span>
          <div className="w-[5.272vh] h-[5.272vh] border-2 border-white rounded-sm rotate-45 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MoveDown  className="h-[3.295vh] w-[3.295vh] animate-bounce rotate-[-45deg]" />
          </div>
        </button>
      </FadeContent>
    </div>
  );
};

export default memo(ScrollIndicator);