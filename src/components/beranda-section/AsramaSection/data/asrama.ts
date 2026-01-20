export interface Asrama {
    id: number;
    image: string;
    title: string;
    address: string;
    badgeText: string;
    badgeColor: string;
    hoverColor: string;
    iconColor: string;
    decorativeGradient: string;
}

export const asramaData: Asrama[] = [
    {
        id: 1,
        image: "/bg/AsramaPutra.webp",
        title: "Asrama Mahasiswa Putra",
        address: "Jl. Saxophone Permata Kencana Blok C no 22, Tunggulwulung, Kec. Lowokwaru, Kota Malang, Jawa Timur 65143",
        badgeText: "Putra",
        badgeColor: "bg-blue-600",
        hoverColor: "group-hover:text-blue-600",
        iconColor: "text-blue-500",
        decorativeGradient: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
        id: 2,
        image: "/bg/AsramaPutri.webp",
        title: "Asrama Mahasiswa Putri",
        address: "Jl. Bukit Hijau Blok E. No 82, Tlogomas, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144",
        badgeText: "Putri",
        badgeColor: "bg-pink-600",
        hoverColor: "group-hover:text-pink-600",
        iconColor: "text-pink-500",
        decorativeGradient: "bg-gradient-to-br from-pink-400 to-pink-600"
    }
];