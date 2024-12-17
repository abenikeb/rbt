"use client";
import { useState } from "react";
import {
	Package,
	ShoppingCart,
	DollarSign,
	Box,
	ArrowUpRight,
	ArrowDownRight,
	User,
	Mail,
	Phone,
	MapPin,
	ArrowLeft,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function VendorManagement() {
	const [vendorData, setVendorData] = useState({
		name: "Abebe Kebede",
		email: "abebe.kebede@example.com",
		phone: "+251 91 234 5678",
		address: "Addis Ababa, Ethiopia",
		avatar: "/placeholder.svg?height=100&width=100",
		totalProducts: 150,
		totalSales: 2500000, // in cents
		balance: 1800000, // in cents
		totalOrders: 500,
		withdrawalRequests: 3,
		earnings: 2200000, // in cents
		recentOrders: [
			{
				id: "001",
				product: "Ethiopian Coffee",
				amount: 150000,
				status: "Completed",
			},
			{
				id: "002",
				product: "Handwoven Scarf",
				amount: 80000,
				status: "Processing",
			},
			{ id: "003", product: "Leather Bag", amount: 250000, status: "Shipped" },
			{ id: "004", product: "Spice Set", amount: 100000, status: "Completed" },
			{
				id: "005",
				product: "Traditional Dress",
				amount: 350000,
				status: "Processing",
			},
		],
	});

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-ET", {
			style: "currency",
			currency: "ETB",
		}).format(amount / 100);
	};

	return (
		<div className="container mx-auto p-6 space-y-8 bg-gray-50">
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					className="text-blue-900 hover:text-blue-700"
					onClick={() => window.history.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back
				</Button>
				<h1 className="text-2xl font-bold text-blue-900">Vendor Dashboard</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-white shadow-md">
					<CardHeader>
						<CardTitle className="text-blue-900">Vendor Profile</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center space-x-4">
						<Avatar className="h-20 w-20">
							<AvatarImage src={vendorData.avatar} alt={vendorData.name} />
							<AvatarFallback>
								{vendorData.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div className="space-y-2">
							<h2 className="text-xl font-semibold text-blue-900">
								{vendorData.name}
							</h2>
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<Mail className="h-4 w-4" />
								<span>{vendorData.email}</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<Phone className="h-4 w-4" />
								<span>{vendorData.phone}</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<MapPin className="h-4 w-4" />
								<span>{vendorData.address}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white shadow-md">
					<CardHeader>
						<CardTitle className="text-blue-900">Account Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-gray-600">
								Total Earnings
							</span>
							<span className="text-2xl font-bold text-blue-900">
								{formatCurrency(vendorData.earnings)}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-gray-600">
								Available Balance
							</span>
							<span className="text-2xl font-bold text-blue-900">
								{formatCurrency(vendorData.balance)}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-gray-600">
								Pending Withdrawal
							</span>
							<span className="text-lg font-semibold text-orange-500">
								{formatCurrency(vendorData.earnings - vendorData.balance)}
							</span>
						</div>
						<Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
							Request Withdrawal
						</Button>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="bg-white shadow-md">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Total Products
						</CardTitle>
						<Package className="h-4 w-4 text-blue-900" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-900">
							{vendorData.totalProducts}
						</div>
						<p className="text-xs text-gray-500">items in your inventory</p>
					</CardContent>
				</Card>
				<Card className="bg-white shadow-md">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Total Sales
						</CardTitle>
						<ShoppingCart className="h-4 w-4 text-blue-900" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-900">
							{formatCurrency(vendorData.totalSales)}
						</div>
						<p className="text-xs text-green-500">+20.1% from last month</p>
					</CardContent>
				</Card>
				<Card className="bg-white shadow-md">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Total Orders
						</CardTitle>
						<Box className="h-4 w-4 text-blue-900" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-900">
							{vendorData.totalOrders}
						</div>
						<p className="text-xs text-green-500">+15% from last month</p>
					</CardContent>
				</Card>
				<Card className="bg-white shadow-md">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Withdrawal Requests
						</CardTitle>
						<ArrowUpRight className="h-4 w-4 text-orange-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-500">
							{vendorData.withdrawalRequests}
						</div>
						<p className="text-xs text-gray-500">pending requests</p>
					</CardContent>
				</Card>
			</div>

			<Card className="bg-white shadow-md">
				<CardHeader>
					<CardTitle className="text-blue-900">Recent Orders</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-blue-900">Order ID</TableHead>
								<TableHead className="text-blue-900">Product</TableHead>
								<TableHead className="text-blue-900">Amount</TableHead>
								<TableHead className="text-blue-900">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{vendorData.recentOrders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.id}</TableCell>
									<TableCell>{order.product}</TableCell>
									<TableCell>{formatCurrency(order.amount)}</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												order.status === "Completed"
													? "bg-green-100 text-green-800"
													: order.status === "Processing"
													? "bg-yellow-100 text-yellow-800"
													: "bg-blue-100 text-blue-800"
											}`}>
											{order.status}
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<Button
						variant="outline"
						className="w-full text-blue-900 border-blue-900 hover:bg-blue-100">
						View All Orders
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
