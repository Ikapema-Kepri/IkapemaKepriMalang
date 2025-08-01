'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
	{ label: 'Beranda', href: '/beranda' },
	{ label: 'Tentang', href: '/tentang' },
	{ label: 'Program', href: '/program' },
	{ label: 'Struktur', href: '/struktur' },
	{ label: 'Kontak', href: '/kontak' },
];

const Navbar: React.FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 w-full z-50">
			<nav className="w-full bg-[#005266] px-4 sm:px-6 md:px-8 lg:px-24 py-1 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" aria-label="Logo IKAPEMA KEPRI—MALANG">
					<img
						src="/LogoIkapema.svg"
						alt="Logo IKAPEMA"
						className="h-10 w-10 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] lg:h-[90px] lg:w-[90px]"
					/>
				</Link>

				{/* Desktop Nav */}
				<ul className="hidden md:flex items-center gap-2 sm:gap-4">
					{navLinks.map((link) => (
						<li key={link.label}>
							<Link
								href={link.href}
								className="text-white font-medium text-sm sm:text-xl px-4 py-2 rounded-full hover:text-[#33D6FF] transition-colors"
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Hamburger */}
				<button
					className="md:hidden p-2 text-white rounded focus:outline-none"
					onClick={() => setOpen((v) => !v)}
					aria-label="Buka menu"
				>
					{open ? (
						<svg
							className="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							className="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</button>
			</nav>

			{/* Mobile Menu */}
			<div
				className={`md:hidden transition-all duration-300 bg-gradient-to-r from-[#005266] to-[#00A3CC] px-4 ${
					open
						? 'max-h-96 py-2 opacity-100 visible'
						: 'max-h-0 opacity-0 invisible'
				} overflow-hidden`}
			>
				<ul className="flex flex-col items-center gap-2">
					{navLinks.map((link) => (
						<li key={link.label}>
							<Link
								href={link.href}
								onClick={() => setOpen(false)}
								className="block text-white font-medium px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default Navbar;

