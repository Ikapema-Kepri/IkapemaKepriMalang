"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ConfirmModal } from "@/components/UI/form-shared";

export default function PengaturanPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetch('/api/settings/maintenance')
      .then(res => res.json())
      .then(data => {
         setMaintenance(data.enabled || false);
         setLoading(false);
      })
      .catch(e => {
         console.error(e);
         setLoading(false);
      });
  }, []);

  const handleToggleClick = () => {
    setShowConfirm(true);
  };

  const toggleMaintenance = async () => {
     setShowConfirm(false);
     setUpdating(true);
     const newState = !maintenance;
     try {
       const res = await fetch('/api/settings/maintenance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled: newState })
       });
       if(res.ok) {
          setMaintenance(newState);
       }
     } catch(e) {
       console.error("Gagal update maintenance mode", e);
     } finally {
       setUpdating(false);
     }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
       <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pengaturan Umum</h1>
        <p className="text-gray-500">Konfigurasi fitur dan parameter global situs web Ikapema Kepri.</p>
      </div>

      <div className="bg-white border text-card-foreground shadow-sm rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-1">
             <h3 className="font-semibold text-lg leading-none tracking-tight text-gray-900 border-b border-gray-100 pb-3 mb-2">Mode Pemeliharaan (Maintenance Mode)</h3>
             <p className="text-sm text-gray-500 pt-1">
               Jika aktif, seluruh pengunjung (publik) akan diarahkan secara otomatis ke halaman &quot;Maintenance&quot; sementara waktu.
             </p>
             <p className="text-sm font-medium text-[#00A3CC] pb-1">
               Admin yang sedang masuk dapat tetap mengemudikan akses layaknya normal.
             </p>
           </div>
           
           <div className="flex-shrink-0">
             {loading ? (
                <div className="w-14 h-7 rounded-full bg-gray-200 animate-pulse"></div>
             ) : (
               <button
                  type="button"
                  onClick={handleToggleClick}
                  disabled={updating}
                  className={`
                    relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00A3CC] focus:ring-offset-2
                    ${maintenance ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-400'}
                    ${updating ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  role="switch"
                  aria-checked={maintenance}
               >
                 <span className="sr-only">Toggle Maintenance Mode</span>
                 <span 
                   className={`
                     pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                     ${maintenance ? 'translate-x-7' : 'translate-x-0'}
                   `}
                 >
                   {updating && <Loader2 className="absolute inset-0 m-auto h-3 w-3 animate-spin text-gray-400" />}
                 </span>
               </button>
             )}
           </div>
        </div>
        
        {maintenance && (
           <div className="mt-6 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 mt-0.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <strong className="block font-bold">Peringatan Akses Publik Terkunci!</strong>
                <span className="block mt-1 text-sm bg-transparent">Mode pemeliharaan saat ini menyala. Pengunjung dari luar portal kini tertahan; namun Anda masih bisa bebas memvalidasi antar-halaman. Jangan lupa matikan kembali usai pembaruan tuntas.</span>
              </div>
           </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmModal
          title={maintenance ? "Matikan Mode Pemeliharaan?" : "Nyalakan Mode Pemeliharaan?"}
          description={
            maintenance
              ? "Situs Ikapema Kepri akan kembali terbuka dan dapat diakses oleh publik secara normal. Lanjutkan?"
              : "Seluruh pengunjung luar akan dialihkan ke halaman pemeliharaan sementara waktu. Anda sebagai Admin akan tetap punya akses navigasi. Lanjutkan?"
          }
          onCancel={() => setShowConfirm(false)}
          onConfirm={toggleMaintenance}
          confirmText={maintenance ? "Matikan" : "Nyalakan"}
          confirmVariant={maintenance ? "cyan" : "danger"}
        />
      )}
    </div>
  );
}
