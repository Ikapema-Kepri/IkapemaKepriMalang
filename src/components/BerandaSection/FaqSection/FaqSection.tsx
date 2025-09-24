"use client";

import React, { memo } from "react";
import { useFaqAnimation } from "./hooks/useFaqAnimation";
import { faqList } from "./data/faq";
import FaqHeader from "./components/FaqHeader";
import FaqList from "./components/FaqList";

const FaqSection: React.FC = () => {
	const { refs, animation } = useFaqAnimation();

	return (
		<section className="flex px-4 sm:px-6 md:px-8 lg:px-[10.544vh] xl:px-[21.087vh] flex-col items-center gap-4 md:gap-6 lg:gap-[5.272vh] py-[10.544vh]">
			<FaqHeader
				headerRef={refs.headerRef}
				isInView={animation.isHeaderInView}
			/>
			<FaqList
				faqListRef={refs.faqListRef}
				isInView={animation.isFaqListInView}
				faqItems={faqList}
			/>
		</section>
	);
};

export default memo(FaqSection);
