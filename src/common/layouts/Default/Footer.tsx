import Image from "next/image";
import React from "react";

import wikidata from "../../../../public/wikidata.svg";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 flex flex-col justify-center rounded-t-xl bg-gray-50 px-8 pb-32 pt-10">
      <div className="mb-8 text-center font-semibold">
        Copyright &copy; franekostrowski
      </div>

      <Image src={wikidata} alt="Wikidata" width={60} height={40} />
    </footer>
  );
};

export default Footer;
