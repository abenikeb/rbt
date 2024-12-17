"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	Package,
	ChevronRight,
	Search,
	ShoppingBag,
	ArrowLeft,
	Truck,
	Calendar,
	MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getUserOrder } from "@/lib/data";

export default function OrdersPage() {
	const [orders, setOrders] = useState<any>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const fetchDataOrders = async () => {
		const userOrders = await getUserOrder();
		setOrders(userOrders);
	};

	useEffect(() => {
		fetchDataOrders();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-blue-900 text-white p-4">
				<h1 className="text-2xl font-bold">My Orders</h1>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex items-center mb-6">
						<Package className="text-orange-500 mr-2" />
						<h2 className="text-xl font-semibold">Order History</h2>
					</div>

					<div className="mb-6">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<Input
								type="search"
								placeholder="Search orders..."
								className="pl-10 w-full"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					<div className="space-y-8">
						{orders.map((order: any) => (
							<div
								key={order.id}
								className="border border-gray-200 rounded-lg p-6">
								<div className="flex items-center justify-between mb-4">
									<div>
										<p className="font-semibold text-blue-900 text-lg">
											Order #{order.id}
										</p>
										<p className="text-sm text-gray-600">{order.date}</p>
									</div>
									<div className="text-right">
										<p className="font-semibold text-lg">
											{order.total.toLocaleString("en-ET")} ETB
										</p>
										<Badge
											variant={
												order.status === "Delivered"
													? "default"
													: order.status === "Shipped"
													? "secondary"
													: "outline"
											}
											className={
												order.status === "Delivered"
													? "bg-green-500 text-white"
													: order.status === "Shipped"
													? "bg-blue-500 text-white"
													: ""
											}>
											{order.status}
										</Badge>
									</div>
								</div>

								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Order Progress</span>
										<span className="text-sm font-medium">
											{order.progress}%
										</span>
									</div>
									<Progress value={order.progress} className="w-full" />
								</div>

								<div className="space-y-4">
									{order.items.map((item: any, index: number) => (
										<div key={index} className="flex items-center space-x-4">
											<Image
												src={item.image}
												alt={item.name}
												width={80}
												height={80}
												className="rounded-md object-cover"
											/>
											<div className="flex-1">
												<p className="font-medium">{item.name}</p>
												<p className="text-sm text-gray-600">
													Quantity: {item.quantity}
												</p>
												<p className="text-sm font-medium">
													{item.price.toLocaleString("en-ET")} ETB
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="mt-4 flex justify-end">
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="outline" className="text-blue-900">
												<ShoppingBag className="mr-2 h-4 w-4" />
												View Order Details
											</Button>
										</DialogTrigger>
										<DialogContent className="max-w-2xl">
											<DialogHeader>
												<DialogTitle>Order Details #{order.id}</DialogTitle>
											</DialogHeader>
											<div className="space-y-6">
												<div className="grid grid-cols-2 gap-4">
													<div className="space-y-2">
														<div className="flex items-center text-sm text-gray-600">
															<Calendar className="mr-2 h-4 w-4" />
															Order Date: {order.date}
														</div>
														<div className="flex items-center text-sm text-gray-600">
															<MapPin className="mr-2 h-4 w-4" />
															Delivery Address: {order.address}
														</div>
														<div className="flex items-center text-sm text-gray-600">
															<Truck className="mr-2 h-4 w-4" />
															Delivery Status: {order.status}
														</div>
													</div>
													<div className="space-y-2">
														<p className="text-sm font-medium">
															Payment Information
														</p>
														<p className="text-sm text-gray-600">
															Payment Method: {order.paymentMethod}
														</p>
														<p className="text-sm text-gray-600">
															Transaction ID: {order.transactionId}
														</p>
													</div>
												</div>

												<Separator />

												<div className="space-y-4">
													<h3 className="font-medium">Order Items</h3>
													{order.items.map((item: any, index: number) => (
														<div
															key={index}
															className="flex items-center justify-between py-2">
															<div className="flex items-center space-x-4">
																<Image
																	src={item.image}
																	alt={item.name}
																	width={60}
																	height={60}
																	className="rounded-md object-cover"
																/>
																<div>
																	<p className="font-medium">{item.name}</p>
																	<p className="text-sm text-gray-600">
																		Quantity: {item.quantity}
																	</p>
																</div>
															</div>
															<p className="font-medium">
																{item.price.toLocaleString("en-ET")} ETB
															</p>
														</div>
													))}
												</div>

												<Separator />

												<div className="space-y-2">
													<div className="flex justify-between text-sm">
														<span>Subtotal</span>
														<span>
															{(order.total * 0.85).toLocaleString("en-ET")} ETB
														</span>
													</div>
													<div className="flex justify-between text-sm">
														<span>Tax (15%)</span>
														<span>
															{(order.total * 0.15).toLocaleString("en-ET")} ETB
														</span>
													</div>
													<div className="flex justify-between font-medium text-lg">
														<span>Total</span>
														<span>
															{order.total.toLocaleString("en-ET")} ETB
														</span>
													</div>
												</div>
											</div>
										</DialogContent>
									</Dialog>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
