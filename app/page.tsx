"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/LoginModal";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const router = useRouter();

	// const handleLogin = (role: string) => {
	// 	setIsLoginModalOpen(false);

	// 	if (role === "admin") {
	// 		router.push("/admin");
	// 	} else if (role === "provider") {
	// 		router.push("/provider");
	// 	}
	// };

	const handleLogin = (role: string) => {
		setIsLoginModalOpen(false);
		router.push("/provider");

		// if (role === "admin") {
		// } else if (role === "provider") {
		// 	router.push("/provider");
		// }
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Header onLoginClick={() => setIsLoginModalOpen(true)} />

			<main className="flex-grow">
				<Hero />
				<Features />
				<Pricing />
			</main>

			<Footer />

			<LoginModal
				isOpen={isLoginModalOpen}
				onClose={() => setIsLoginModalOpen(false)}
				onLogin={handleLogin}
			/>
		</div>
	);
}
