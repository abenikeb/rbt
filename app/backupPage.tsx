// "use client";

// import { useState, FormEvent } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
// 	ChevronRight,
// 	Search,
// 	Laptop,
// 	User,
// 	Menu,
// 	Smartphone,
// 	Headphones,
// 	Camera,
// 	Tv,
// 	Watch,
// 	Gamepad,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Badge } from "@/components/ui/badge";

// const categories = [
// 	{ name: "Laptops", icon: Laptop },
// 	{ name: "Smartphones", icon: Smartphone },
// 	{ name: "Audio", icon: Headphones },
// 	{ name: "Cameras", icon: Camera },
// 	{ name: "TVs", icon: Tv },
// 	{ name: "Wearables", icon: Watch },
// 	{ name: "Gaming", icon: Gamepad },
// ];

// const featuredProducts = [
// 	{
// 		id: 1,
// 		name: "Ultra-Slim Laptop",
// 		price: 999.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Laptops",
// 	},
// 	{
// 		id: 2,
// 		name: "5G Smartphone",
// 		price: 799.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Smartphones",
// 	},
// 	{
// 		id: 3,
// 		name: "Noise-Cancelling Headphones",
// 		price: 299.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Audio",
// 	},
// 	{
// 		id: 4,
// 		name: "4K OLED TV",
// 		price: 1499.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "TVs",
// 	},
// 	{
// 		id: 5,
// 		name: "Mirrorless Camera",
// 		price: 1299.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Cameras",
// 	},
// 	{
// 		id: 6,
// 		name: "Smartwatch",
// 		price: 249.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Wearables",
// 	},
// 	{
// 		id: 7,
// 		name: "Gaming Console",
// 		price: 499.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Gaming",
// 	},
// 	{
// 		id: 8,
// 		name: "Wireless Earbuds",
// 		price: 159.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Audio",
// 	},
// ];

// const trendingProducts = [
// 	{
// 		id: 9,
// 		name: "Foldable Phone",
// 		price: 1299.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Smartphones",
// 	},
// 	{
// 		id: 10,
// 		name: "Gaming Laptop",
// 		price: 1799.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Laptops",
// 	},
// 	{
// 		id: 11,
// 		name: "Smart Home Hub",
// 		price: 129.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Smart Home",
// 	},
// 	{
// 		id: 12,
// 		name: "Drone with 4K Camera",
// 		price: 799.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Cameras",
// 	},
// ];

// const popularProducts = [
// 	{
// 		id: 13,
// 		name: "Wireless Charging Pad",
// 		price: 39.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Accessories",
// 	},
// 	{
// 		id: 14,
// 		name: "Bluetooth Speaker",
// 		price: 79.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Audio",
// 	},
// 	{
// 		id: 15,
// 		name: "Fitness Tracker",
// 		price: 99.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Wearables",
// 	},
// 	{
// 		id: 16,
// 		name: "Portable SSD",
// 		price: 149.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Storage",
// 	},
// ];

// const allProducts = [
// 	...featuredProducts,
// 	...trendingProducts,
// 	...popularProducts,
// 	{
// 		id: 17,
// 		name: "Mechanical Keyboard",
// 		price: 129.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Accessories",
// 	},
// 	{
// 		id: 18,
// 		name: "Ultrawide Monitor",
// 		price: 699.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Monitors",
// 	},
// 	{
// 		id: 19,
// 		name: "Wireless Mouse",
// 		price: 49.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Accessories",
// 	},
// 	{
// 		id: 20,
// 		name: "External GPU",
// 		price: 299.99,
// 		image: "/placeholder.svg?height=200&width=200",
// 		category: "Components",
// 	},
// ];

// export default function ElectronicsHomePage() {
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const [searchQuery, setSearchQuery] = useState("");

// 	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		// Implement search functionality here
// 		console.log("Searching for:", searchQuery);
// 	};

// 	return (
// 		<div className="flex flex-col min-h-screen">
// 			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
// 				<div className="container flex flex-col md:flex-row h-auto md:h-16 items-center py-2 md:py-0">
// 					<div className="flex items-center w-full md:w-auto justify-between md:justify-start">
// 						<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
// 							<SheetTrigger asChild>
// 								<Button
// 									variant="ghost"
// 									size="icon"
// 									className="md:hidden text-navy-700">
// 									<Menu className="h-5 w-5" />
// 									<span className="sr-only">Toggle menu</span>
// 								</Button>
// 							</SheetTrigger>
// 							<SheetContent
// 								side="left"
// 								className="w-[300px] sm:w-[400px] bg-amber-50">
// 								<nav className="flex flex-col gap-4">
// 									{categories.map((category) => (
// 										<Link
// 											key={category.name}
// 											href={`/category/${category.name.toLowerCase()}`}
// 											className="flex items-center space-x-2 text-lg text-navy-700 hover:text-amber-600 transition-colors">
// 											<category.icon className="h-6 w-6" />
// 											<span>{category.name}</span>
// 										</Link>
// 									))}
// 								</nav>
// 							</SheetContent>
// 						</Sheet>
// 						<Link
// 							href="/"
// 							className="flex items-center space-x-2 text-navy-700">
// 							<Laptop className="h-6 w-6 text-amber-500" />
// 							<span className="font-bold text-xl">TechMarket</span>
// 						</Link>
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							className="md:hidden text-navy-700">
// 							<User className="h-5 w-5" />
// 							<span className="sr-only">User account</span>
// 						</Button>
// 					</div>
// 					<nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:flex">
// 						{categories.map((category) => (
// 							<Button asChild variant="ghost" key={category.name}>
// 								<Link
// 									href={`/category/${category.name.toLowerCase()}`}
// 									className="text-sm font-medium transition-colors">
// 									{category.name}
// 								</Link>
// 							</Button>
// 						))}
// 					</nav>
// 					<div className="flex items-center space-x-4 mt-2 md:mt-0 md:ml-auto w-full md:w-auto">
// 						<form onSubmit={handleSearch} className="flex-1 md:flex-none">
// 							<div className="relative">
// 								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// 								<Input
// 									type="search"
// 									placeholder="Search electronics..."
// 									className="w-full md:w-[300px] pl-8"
// 									value={searchQuery}
// 									onChange={(e) => setSearchQuery(e.target.value)}
// 								/>
// 							</div>
// 						</form>
// 						<Button variant="ghost" size="icon" className="hidden md:flex">
// 							<User className="h-5 w-5" />
// 							<span className="sr-only">User account</span>
// 						</Button>
// 					</div>
// 				</div>
// 			</header>
// 			<main className="flex-1">
// 				{/* Welcome to TechMarket */}
// 				<section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
// 					<div className="container mx-auto px-4 text-center">
// 						<h1 className="text-4xl font-bold mb-4">Welcome to TechMarket</h1>
// 						<p className="text-xl mb-8">
// 							Discover the latest and greatest in electronics
// 						</p>
// 						<Button size="lg" variant="secondary" asChild>
// 							<Link href="/products">
// 								Explore All Products
// 								<ChevronRight className="ml-2 h-4 w-4" />
// 							</Link>
// 						</Button>
// 					</div>
// 				</section>
// 				{/* Featured Products */}
// 				<section className="py-12">
// 					<div className="container mx-auto px-4">
// 						<div className="flex justify-between items-center mb-8">
// 							<h2 className="text-3xl font-bold">Featured Products</h2>
// 							<Button variant="outline" asChild>
// 								<Link href="/products">
// 									See More
// 									<ChevronRight className="ml-2 h-4 w-4" />
// 								</Link>
// 							</Button>
// 						</div>
// 						<div className="relative">
// 							<div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide">
// 								{featuredProducts.map((product) => (
// 									<Card key={product.id} className="flex-shrink-0 w-[200px]">
// 										<CardContent className="flex flex-col items-center p-4">
// 											<Image
// 												src={product.image}
// 												alt={product.name}
// 												width={150}
// 												height={150}
// 												className="mb-2 rounded-md"
// 											/>
// 											<h3 className="font-semibold text-sm mb-1 text-center">
// 												{product.name}
// 											</h3>
// 											<Badge className="mb-1">{product.category}</Badge>
// 											<p className="text-sm text-muted-foreground mb-2">
// 												${product.price.toFixed(2)}
// 											</p>
// 											<Button size="sm" className="w-full">
// 												Add to Cart
// 											</Button>
// 										</CardContent>
// 									</Card>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 				{/* Trending Products */}
// 				<section className="py-12 bg-muted">
// 					<div className="container mx-auto px-4">
// 						<div className="flex justify-between items-center mb-8">
// 							<h2 className="text-3xl font-bold">Trending Products</h2>
// 							<Button variant="outline" asChild>
// 								<Link href="/trending">
// 									See All Trending
// 									<ChevronRight className="ml-2 h-4 w-4" />
// 								</Link>
// 							</Button>
// 						</div>
// 						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// 							{trendingProducts.map((product) => (
// 								<Card key={product.id}>
// 									<CardContent className="flex flex-col items-center p-4">
// 										<Image
// 											src={product.image}
// 											alt={product.name}
// 											width={150}
// 											height={150}
// 											className="mb-2 rounded-md"
// 										/>
// 										<h3 className="font-semibold text-sm mb-1 text-center">
// 											{product.name}
// 										</h3>
// 										<Badge className="mb-1">{product.category}</Badge>
// 										<p className="text-sm text-muted-foreground mb-2">
// 											${product.price.toFixed(2)}
// 										</p>
// 										<Button size="sm" className="w-full">
// 											Add to Cart
// 										</Button>
// 									</CardContent>
// 								</Card>
// 							))}
// 						</div>
// 					</div>
// 				</section>
// 				{/* Most Popular */}
// 				<section className="py-12">
// 					<div className="container mx-auto px-4">
// 						<div className="flex justify-between items-center mb-8">
// 							<h2 className="text-3xl font-bold">Most Popular</h2>
// 							<Button variant="outline" asChild>
// 								<Link href="/popular">
// 									See All Popular
// 									<ChevronRight className="ml-2 h-4 w-4" />
// 								</Link>
// 							</Button>
// 						</div>
// 						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// 							{popularProducts.map((product) => (
// 								<Card key={product.id}>
// 									<CardContent className="flex flex-col items-center p-4">
// 										<Image
// 											src={product.image}
// 											alt={product.name}
// 											width={150}
// 											height={150}
// 											className="mb-2 rounded-md"
// 										/>
// 										<h3 className="font-semibold text-sm mb-1 text-center">
// 											{product.name}
// 										</h3>
// 										<Badge className="mb-1">{product.category}</Badge>
// 										<p className="text-sm text-muted-foreground mb-2">
// 											${product.price.toFixed(2)}
// 										</p>
// 										<Button size="sm" className="w-full">
// 											Add to Cart
// 										</Button>
// 									</CardContent>
// 								</Card>
// 							))}
// 						</div>
// 					</div>
// 				</section>
// 				{/* All Products */}
// 				<section className="py-12 bg-muted">
// 					<div className="container mx-auto px-4">
// 						<h2 className="text-3xl font-bold mb-8">All Products</h2>
// 						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
// 							{allProducts.map((product) => (
// 								<Card key={product.id}>
// 									<CardContent className="flex flex-col sm:flex-row items-center p-4">
// 										<Image
// 											src={product.image}
// 											alt={product.name}
// 											width={100}
// 											height={100}
// 											className="mb-4 sm:mb-0 sm:mr-4 rounded-md"
// 										/>
// 										<div className="flex-1 text-center sm:text-left">
// 											<h3 className="font-semibold text-lg mb-1">
// 												{product.name}
// 											</h3>
// 											<Badge className="mb-2">{product.category}</Badge>
// 											<p className="text-muted-foreground mb-4">
// 												${product.price.toFixed(2)}
// 											</p>
// 											<Button className="w-full sm:w-auto">Add to Cart</Button>
// 										</div>
// 									</CardContent>
// 								</Card>
// 							))}
// 						</div>
// 					</div>
// 				</section>
// 				{/* Shop by Category */}
// 				<section className="py-12">
// 					<div className="container mx-auto px-4">
// 						<h2 className="text-3xl font-bold mb-8 text-navy-700">
// 							Shop by Category
// 						</h2>
// 						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
// 							{categories.map((category) => (
// 								<Link
// 									key={category.name}
// 									href={`/category/${category.name.toLowerCase()}`}
// 									className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
// 									<category.icon className="h-12 w-12 mb-2 text-amber-500" />
// 									<span className="text-sm font-medium text-center text-navy-700">
// 										{category.name}
// 									</span>
// 								</Link>
// 							))}
// 						</div>
// 					</div>
// 				</section>
// 				{/* >Stay Updated */}
// 				<section className="py-12 bg-muted">
// 					<div className="container mx-auto px-4 text-center">
// 						<h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
// 						<p className="text-xl mb-8">
// 							Subscribe to our newsletter for the latest tech news and exclusive
// 							deals
// 						</p>
// 						<form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
// 							<Input
// 								type="email"
// 								placeholder="Enter your email"
// 								className="w-full"
// 							/>
// 							<Button type="submit">Subscribe</Button>
// 						</form>
// 					</div>
// 				</section>
// 			</main>
// 			<footer className="bg-muted py-6">
// 				<div className="container mx-auto px-4">
// 					<div className="flex flex-col md:flex-row justify-between items-center">
// 						<div className="mb-4 md:mb-0">
// 							<Link href="/" className="flex items-center space-x-2">
// 								<Laptop className="h-6 w-6" />
// 								<span className="font-bold">TechMarket</span>
// 							</Link>
// 						</div>
// 						<nav className="flex gap-4">
// 							<Link href="/about" className="text-sm hover:underline">
// 								About
// 							</Link>
// 							<Link href="/terms" className="text-sm hover:underline">
// 								Terms
// 							</Link>
// 							<Link href="/privacy" className="text-sm hover:underline">
// 								Privacy
// 							</Link>
// 							<Link href="/contact" className="text-sm hover:underline">
// 								Contact
// 							</Link>
// 						</nav>
// 					</div>
// 					<div className="mt-4 text-center text-sm text-muted-foreground">
// 						© 2023 TechMarket. All rights reserved.
// 					</div>
// 				</div>
// 			</footer>
// 		</div>
// 	);
// }
