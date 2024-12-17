"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, ShoppingBag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export default function EnhancedCheckout() {
	const [orderTotal] = useState(499.98);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const router = useRouter();

	const subtotal = orderTotal * 0.85;
	const tax = orderTotal * 0.15;

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsSubmitting(false);
		setIsOrderComplete(true);

		// Show success toast
		toast({
			title: "Order Placed Successfully!",
			description: "Your order has been placed and is being processed.",
			duration: 5000,
		});

		// Redirect to orders page after 3 seconds
		setTimeout(() => {
			router.push("/orders");
		}, 3000);
	};

	const handleContinueShopping = () => {
		router.push("/");
	};

	if (isOrderComplete) {
		return (
			<div className="container mx-auto px-4 py-8 my-8 text-center">
				<CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
				<h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
				<p className="mb-8">
					Your order has been placed successfully. Redirecting to your orders...
				</p>
				<Button
					onClick={() => router.push("/orders")}
					className="bg-blue-800 hover:bg-blue-900">
					View My Orders
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 my-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Checkout</h1>
				<Button
					onClick={handleContinueShopping}
					variant="outline"
					className="bg-blue-800 text-white hover:bg-blue-900">
					<ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
				</Button>
			</div>
			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle>Complete Your Order</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<h2 className="text-xl font-semibold">Shipping Information</h2>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="firstName">First Name</Label>
									<Input id="firstName" placeholder="Abebe" required />
								</div>
								<div>
									<Label htmlFor="lastName">Last Name</Label>
									<Input id="lastName" placeholder="Teka" required />
								</div>
							</div>
							<div>
								<Label htmlFor="address">Address</Label>
								<Input
									id="address"
									placeholder="Gurdshola Mercy Plaza"
									required
								/>
							</div>
						</div>

						<Separator />

						<div className="space-y-4">
							<h2 className="text-xl font-semibold">Payment Information</h2>
							<RadioGroup defaultValue="card">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="card" id="card" />
									<Label htmlFor="card">CBE Credit Card</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="paypal" id="paypal" />
									<Label htmlFor="paypal">PayPal</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="bank" id="bank" />
									<Label htmlFor="bank">Amole, Dashn Bank</Label>
								</div>
							</RadioGroup>
							<div>
								<Label htmlFor="phoneNumber">Phone Number</Label>
								<div className="flex">
									<Smartphone className="w-5 h-5 mr-2 text-muted-foreground self-center" />
									<Input
										id="phoneNumber"
										placeholder="+251 123 456 789"
										required
									/>
								</div>
							</div>
						</div>

						<Separator />

						<div className="space-y-2">
							<h2 className="text-xl font-semibold">Order Summary</h2>
							<div className="space-y-1">
								<div className="flex justify-between items-center text-sm">
									<span>Subtotal</span>
									<span>{subtotal.toFixed(2)} Birr</span>
								</div>
								<div className="flex justify-between items-center text-sm">
									<span>Tax (15%)</span>
									<span>{tax.toFixed(2)} Birr</span>
								</div>
								<Separator className="my-2" />
								<div className="flex justify-between items-center font-semibold">
									<span>Total</span>
									<span>{orderTotal.toFixed(2)} Birr</span>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							className="w-full bg-blue-800 hover:bg-blue-900"
							size="lg"
							disabled={isSubmitting}>
							<CreditCard className="mr-2 h-4 w-4" />
							{isSubmitting ? "Processing..." : "Place Order"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
