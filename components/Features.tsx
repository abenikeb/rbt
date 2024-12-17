import {
	Music,
	Headphones,
	Radio,
	DollarSign,
	DollarSignIcon,
} from "lucide-react";

export function Features() {
	const features = [
		{
			icon: Music,
			title: "Real-Time Performance Tracking",
			description:
				"Detailed analytics and reporting provide real-time insights into campaign performance, enabling advertisers to make quick adjustments and optimize their campaigns for better results.",
		},
		{
			icon: DollarSignIcon,
			title: "Cost-Effectiveness",
			description:
				"Compared to traditional advertising channels, AdRBT can often be more cost-effective, especially for reaching large, targeted audiences.",
		},
		{
			icon: Radio,
			title: "Measurable Results ",
			description:
				"Comprehensive tracking and reporting, advertisers can easily measure the effectiveness of their campaigns and calculate their return on investment (ROI).",
		},
	];

	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto">
				<h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
							<feature.icon className="mx-auto h-16 w-16 text-lime-500 mb-6" />
							<h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
