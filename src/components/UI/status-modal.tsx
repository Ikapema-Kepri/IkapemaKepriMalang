"use client";

import React from 'react'
import { useModalStore } from '@/store/useModalStore'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const IMAGE_ASSETS = {
    success: "/icon/status-success.webp",
    error: "/icon/status-fail.webp",
    info: "/icon/status-warning.webp",
}

const StatusModal = () => {
    const { isOpen, status, message, closeModal} = useModalStore();

    const currentImage = IMAGE_ASSETS[status];
    const buttonColor = 
        status === "success" 
            ? "bg-green-600 hover:bg-green-700" 
            : status === "info" 
            ? "bg-yellow-600 hover:bg-yellow-700" 
            : "bg-red-600 hover:bg-red-700";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <motion.div 
                        initial={{ scale: 0.7, y: 30, opacity: 0 }}
                        animate={{ 
                            scale: 1, 
                            y: 0,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                damping: 15,
                                stiffness: 300
                            }
                        }}
                        exit={{ 
                            scale: 0.85, 
                            y: 20, 
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn"
                            }
                        }}
                        className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg"
                    >
                        <div className="mx-auto mb-4 flex justify-center">
                            <Image
                                width={200}
                                height={100}
                                src={currentImage} 
                                alt={`Status: ${status}`} 
                                className="h-50 w-100 object-contain" // Sesuaikan ukuran dengan Tailwind
                                unoptimized
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{message}</p>

                        <button
                            onClick={closeModal}
                            className={`mt-6 w-full rounded-lg px-4 py-2 font-medium text-white transition-colors ${buttonColor}`}
                        >
                            Tutup
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default StatusModal;
