import React, { memo, useMemo } from "react";
import FaqCard from "../../../UI/faq-card";
import { FaqItem } from "../data/faq";

interface FaqListProps {
  faqListRef: React.Ref<HTMLDivElement>;
  isInView: boolean;
  faqItems: FaqItem[];
}

const FaqList: React.FC<FaqListProps> = ({ faqListRef, isInView, faqItems }) => {
  const containerClasses = useMemo(
    () =>
      `w-full flex flex-col items-center gap-4 md:gap-[3.954vh] transition-all duration-1200 ease-out ${
        isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
      }`,
    [isInView]
  );

  return (
    <div ref={faqListRef} className={containerClasses}>
      {faqItems.map((faq, idx) => (
        <div
          key={idx}
          className={`w-full flex items-center justify-center transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: isInView ? `${idx * 100}ms` : "0ms",
          }}
        >
          <FaqCard question={faq.question} answer={faq.answer} />
        </div>
      ))}
    </div>
  );
};

export default memo(FaqList);