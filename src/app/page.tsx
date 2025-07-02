// import Image from "next/image";

import BerandaPage from "./pages/BerandaPage";
// import NavbarSwitcher from "./components/NavbarSwitcher/NavbarSwitcher";


export default function Home() {
  return (
    <div className="bg-[#E5FAFF] min-h-screen flex flex-col">
      
      <main className="flex-1 w-full max-w-[1920px]">
        <BerandaPage />
        </main>
    </div>
  );
}
