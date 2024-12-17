import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Music } from "./ProviderDashboard";
import { Phone, Wallet } from "lucide-react";

interface PaymentPopupProps {
	Music: Music;
	onComplete: () => void;
	onClose: () => void;
}

export function PaymentPopup({
	Music,
	onComplete,
	onClose,
}: PaymentPopupProps) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsProcessing(true);

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsProcessing(false);
		onComplete();
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Complete Payment for {Music.name}</DialogTitle>
					<DialogDescription>
						Use Telebirr to complete your payment and publish your Music.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="phone">Telebirr Phone Number</Label>
						<div className="flex">
							<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
								+251
							</span>
							<Input
								id="phone"
								type="tel"
								placeholder="9XXXXXXXX"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								className="rounded-l-none"
								required
							/>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600"
							disabled={isProcessing}>
							{isProcessing ? (
								"Processing..."
							) : (
								<>
									<Wallet className="mr-2 h-4 w-4" /> Pay with Telebirr
								</>
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
