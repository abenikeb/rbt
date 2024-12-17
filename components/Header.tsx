import { Button } from "@/components/ui/button";

interface HeaderProps {
	onLoginClick: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
	return (
		<header className="bg-white shadow-sm">
			<div className="container mx-auto py-4 px-4 flex justify-between items-center">
				<div className="flex flex-row gap-3 items-center">
					<img src="/assets/images/logo-tele.png" className="w-36" alt="" />
					<h1 className="text-2xl font-bold text-lime-500">Ad-RBT</h1>
				</div>
				<nav>
					<Button variant="ghost" className="mr-4">
						Features
					</Button>
					<Button variant="ghost" className="mr-4">
						Pricing
					</Button>
					<Button variant="outline" className="mr-4" onClick={onLoginClick}>
						Login
					</Button>
					<Button className="bg-lime-500 hover:bg-lime-600 text-white">
						Sign Up
					</Button>
				</nav>
			</div>
		</header>
	);
}
