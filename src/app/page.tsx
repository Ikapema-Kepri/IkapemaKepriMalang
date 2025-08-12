
import { redirect } from "next/navigation";

export default function Home() {
  // <div className="bg-[#E5FAFF] min-h-screen flex flex-col">

  //   <main className="flex-1 w-full max-w-[1920px]">
  //     <BerandaPage />
  //     </main>
  // </div>
  redirect("/beranda");
  return null;
}
