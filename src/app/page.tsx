// import Image from "next/image";

import BerandaPage from "./pages/BerandaPage";


export default function Home() {
  return (
    <div className="bg-[#E5FAFF] min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-[1920px]">
        <BerandaPage />
        </main>
    </div>
  );
}
