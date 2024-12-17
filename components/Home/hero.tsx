"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
	const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

	const bannerImages = [
		"/assets/images/banner_main.jpg?height=150&width=1200&text=Summer+Sale",
		"/assets/images/banner_main.jpg?height=150&width=1200&text=New+Arrivals",
		"/assets/images/banner.jpg?height=150&width=1200&text=Special+Offers",
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentBannerIndex(
				(prevIndex) => (prevIndex + 1) % bannerImages.length
			);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	return (
		<section className="relative h-[180px] overflow-hidden bg-gradient-to-r from-[#4b5d74] to-[#4b5d74]">
			<div className="absolute inset-0 opacity-20">
				{bannerImages.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`Promotional Banner ${index + 1}`}
						className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
							index === currentBannerIndex ? "opacity-100" : "opacity-0"
						}`}
					/>
				))}
			</div>
			<div className="relative container mx-auto h-full flex items-center px-4">
				<div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
					<div className="text-center sm:text-left">
						<h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white mb-2">
							Welcome to <span className="text-[#febe66]">Biisho Market</span>
						</h1>
						<p className="text-sm sm:text-base text-white font-light">
							Discover amazing deals on your favorite Biisho products
						</p>
					</div>
					<Button
						size="lg"
						className="bg-[#febe66] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#ffd699] transition-colors duration-200"
						asChild>
						<Link href="/product">
							Shop Now
							<ChevronRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</div>
			</div>
			<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{bannerImages.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-1 rounded-lg transition-colors duration-200 ${
							index === currentBannerIndex
								? "bg-[#febe66]"
								: "bg-white bg-opacity-50"
						}`}
						onClick={() => setCurrentBannerIndex(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
};

export default Hero;
