import { Button } from "@/components/ui/button";
import Link from "@node_modules/next/link";
import { useRouter } from "@node_modules/next/navigation";
export function Hero() {
	const router = useRouter();
	const handleClickRegister = () => {
		router.push("/register-provider");
	};
	return (
		<section className="relative py-32 overflow-hidden">
			<div className="absolute inset-0 z-0 bg-blue-500">
				{/* <img
					src="/assets/images/promo2.jpg?height=1080&width=1920"
					alt="Background"
					className="w-full h-full object-cover"
				/> */}
				<div className="absolute inset-0 bg-black opacity-60">j</div>
			</div>
			<div className="relative z-10 container mx-auto text-center text-white">
				<h2 className="text-5xl font-bold mb-6 leading-tight">
					Elevate Your Brand{" "}
					<span className="text-lime-400">
						with the Power of Ring Back Advertising!
					</span>
				</h2>
				<p className="text-xl mb-10 max-w-2xl mx-auto">
					Unlimited Music streaming for all your devices. Dive into a world of
					melodies, rhythms, and harmonies.
				</p>

				<Button
					onClick={handleClickRegister}
					size="lg"
					className="bg-lime-500 hover:bg-lime-600 text-white">
					Register
				</Button>
			</div>
		</section>
	);
}
