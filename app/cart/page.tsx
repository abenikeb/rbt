"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getUserCart } from "@lib/data";

interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

export default function CartPage() {
	const router = useRouter();
	const [cartItems, setCartItems] = useState<CartItem[] | any>([]);

	const fetchDataCartItems = async () => {
		const userOrders = await getUserCart();
		setCartItems(userOrders);
	};

	useEffect(() => {
		fetchDataCartItems();
	}, []);

	const updateQuantity = (id: number, newQuantity: number) => {
		setCartItems(
			cartItems
				.map((item: any) =>
					item.id === id
						? { ...item, quantity: Math.max(0, newQuantity) }
						: item
				)
				.filter((item: any) => item.quantity > 0)
		);
	};

	const removeItem = (id: number) => {
		setCartItems(cartItems.filter((item: any) => item.id !== id));
	};

	const subtotal = cartItems.reduce(
		(sum: any, item: any) => sum + item.price * item.quantity,
		0
	);
	const tax = subtotal * 0.1;
	const total = subtotal + tax;

	const handleCheckout = () => {
		router.push("/checkout");
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<Button variant="ghost" size="sm" asChild>
					<Link href="/">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Continue Shopping
					</Link>
				</Button>
				<h1 className="text-3xl font-bold">Your Cart</h1>
			</div>

			{cartItems.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-xl mb-4">Your cart is empty</p>
					<Button asChild>
						<Link href="/">Start Shopping</Link>
					</Button>
				</div>
			) : (
				<div className="grid md:grid-cols-3 gap-8">
					<div className="md:col-span-2 space-y-4">
						{cartItems.map((item: any) => (
							<Card key={item.id}>
								<CardContent className="p-4">
									<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
										<div className="flex items-center space-x-4">
											<Image
												src={item.image}
												alt={item.name}
												width={80}
												height={80}
												className="rounded-md"
											/>
											<div>
												<h3 className="font-medium">{item.name}</h3>
												<p className="text-sm text-muted-foreground">
													{item.price.toFixed(2)} Birr each
												</p>
											</div>
										</div>
										<div className="flex items-center space-x-4">
											<div className="flex items-center space-x-2">
												<Button
													variant="outline"
													size="icon"
													onClick={() =>
														updateQuantity(item.id, item.quantity - 1)
													}>
													<Minus className="h-4 w-4" />
												</Button>
												<Input
													type="number"
													value={item.quantity}
													onChange={(e) =>
														updateQuantity(item.id, parseInt(e.target.value))
													}
													className="w-16 text-center"
													min="0"
												/>
												<Button
													variant="outline"
													size="icon"
													onClick={() =>
														updateQuantity(item.id, item.quantity + 1)
													}>
													<Plus className="h-4 w-4" />
												</Button>
											</div>
											<div className="text-right">
												<p className="font-medium">
													{(item.price * item.quantity).toFixed(2)} Birr
												</p>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => removeItem(item.id)}
													className="text-red-500">
													<Trash2 className="h-4 w-4 mr-1" />
													Remove
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<div>
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Subtotal</span>
										<span>{subtotal.toFixed(2)} ETB</span>
									</div>
									<div className="flex justify-between">
										<span>Tax</span>
										<span>{tax.toFixed(2)} ETB</span>
									</div>
									<Separator className="my-2" />
									<div className="flex justify-between font-semibold">
										<span>Total</span>
										<span>{total.toFixed(2)} ETB</span>
									</div>
								</div>
								<Button onClick={handleCheckout} className="w-full mt-6">
									Proceed to Checkout
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}
