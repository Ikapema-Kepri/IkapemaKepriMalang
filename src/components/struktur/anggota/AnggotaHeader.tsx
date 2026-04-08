import React from "react";
import Image from "next/image";

const AnggotaHeader: React.FC = () => {
  return (
    <section className="text-center">
      <div className="flex items-center justify-center gap-4">
        <Image
          src="/heading/HeadingAnggota.svg"
          alt="Heading Anggota"
          width={454}
          height={100}
          className="h-10 md:h-20 lg:h-[18.356vh] w-auto max-w-[90%]"
        />
      </div>
    </section>
  );
};

export default AnggotaHeader;
