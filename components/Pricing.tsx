import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
	const plans = [
		{
			name: "Basic",
			price: "ETB 299.99",
			features: [
				"Post millions of songs",
				"Ad-free listening",
				"High-quality audio",
			],
		},
		{
			name: "Premium",
			price: "ETB 1114.99",
			features: [
				"All Basic features",
				"Offline mode",
				"Personalized playlists",
				"Multi-device support",
			],
		},
		{
			name: "Family",
			price: "ETB 2019.99",
			features: [
				"All Premium features",
				"Up to 6 accounts",
				"Parental controls",
				"Shared playlists",
			],
		},
	];

	return (
		<section className="py-20 bg-gray-50">
			<div className="container mx-auto">
				<h2 className="text-4xl font-bold text-center mb-12">Choose a Plan</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<div
							key={index}
							className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
							<h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
							<p className="text-4xl font-bold mb-6 text-lime-500">
								{plan.price}
								<span className="text-sm text-gray-500">/month</span>
							</p>
							<ul className="mb-8">
								{plan.features.map((feature, i) => (
									<li key={i} className="flex items-center mb-2">
										<Check className="h-5 w-5 text-lime-500 mr-2" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">
								Choose Plan
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
