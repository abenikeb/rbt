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
			<div className="absolute inset-0 z-0 bg-[#238dcb]">
				<img
					src="/assets/images/promo7.png?height=1080&width=1920"
					alt="Background"
					className="w-full h-full object-contain opacity-20"
				/>
				<div className="absolute inset-0 bg-black opacity-30">j</div>
			</div>
			<div className="relative z-10 container mx-auto text-center text-white">
				<h2 className="text-6xl font-extrabold mb-6 leading-tight">
					Revolutionizing Mobile Advertising in{" "}
					<span className="text-lime-400">Ethiopia.</span>
				</h2>
				<p className="text-2xl mb-10 max-w-2xl mx-auto">
					Elevate Your Brand with the Power of Ring Back Advertising!
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
