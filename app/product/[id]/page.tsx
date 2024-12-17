"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Heart,
	MessageCircle,
	Share2,
	ChevronLeft,
	ChevronRight,
	Star,
	ArrowLeft,
	Phone,
	MessageSquare,
	Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function ProductPostPage() {
	const router = useRouter();
	const [currentImage, setCurrentImage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [showFullImage, setShowFullImage] = useState(false);

	const product = {
		name: "4K OLED TV",
		price: 2299.99,
		discountPrice: 1999.99,
		description:
			"Experience stunning visuals with our latest 4K OLED technology. This TV offers unparalleled picture quality, deep blacks, and vibrant colors that bring your favorite content to life.",
		condition: "Brand New",
		category: "Televisions",
		location: "Addis Ababa, Ethiopia",
		images: [
			"/assets/images/4k_tv.jpg?height=400&width=600",
			"/assets/images/product2.jpg?height=400&width=600",
			"/assets/images/product3.jpg?height=400&width=600",
		],
		seller: {
			name: "Biisho Market",
			rating: 4.8,
			totalSales: 52,
			avatar: "/placeholder.svg?height=40&width=40",
		},
	};

	useEffect(() => {
		// Simulate loading delay
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	const nextImage = () => {
		setCurrentImage((prev) => (prev + 1) % product.images.length);
	};

	const prevImage = () => {
		setCurrentImage(
			(prev) => (prev - 1 + product.images.length) % product.images.length
		);
	};

	const handleContact = (method: string) => {
		// Simulate redirection or action based on contact method
		console.log(`Contacting via ${method}`);
		// In a real app, you might use router.push() here
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-3 space-y-4">
				<Skeleton className="h-8 w-3/4" />
				<Skeleton className="h-[300px] w-full" />
				<div className="space-y-2">
					<Skeleton className="h-6 w-1/2" />
					<Skeleton className="h-4 w-1/4" />
				</div>
				<Skeleton className="h-[200px] w-full" />
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-3">
			<header className="flex justify-between items-center mb-3">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/">
						<ArrowLeft className="h-6 w-6" />
						<span className="sr-only">Back</span>
					</Link>
				</Button>
				<h1 className="text-2xl font-bold md:block">{product.name}</h1>
			</header>
			<div className="grid gap-8 md:grid-cols-2">
				<div className="space-y-4">
					<Dialog open={showFullImage} onOpenChange={setShowFullImage}>
						<DialogTrigger asChild>
							<div className="relative aspect-video cursor-pointer">
								<Image
									src={product.images[currentImage]}
									alt={`${product.name} - Image ${currentImage + 1}`}
									layout="fill"
									objectFit="cover"
									className="rounded-lg"
								/>
								<Button
									variant="outline"
									size="icon"
									className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
									onClick={(e) => {
										e.stopPropagation();
										prevImage();
									}}>
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
									onClick={(e) => {
										e.stopPropagation();
										nextImage();
									}}>
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</DialogTrigger>
						<DialogContent className="max-w-4xl">
							<Image
								src={product.images[currentImage]}
								alt={`${product.name} - Full Size Image`}
								width={1200}
								height={800}
								className="w-full h-auto"
							/>
						</DialogContent>
					</Dialog>
					<div className="flex justify-center space-x-2">
						{product.images.map((_, index) => (
							<Button
								key={index}
								variant={index === currentImage ? "default" : "outline"}
								size="icon"
								onClick={() => setCurrentImage(index)}>
								{index + 1}
							</Button>
						))}
					</div>
				</div>
				<div className="space-y-3">
					<div>
						<h1 className="text-2xl font-bold">{product.name}</h1>
						<div className="mt-2 flex items-baseline space-x-3">
							<p className="text-2xl font-semibold text-primary">
								{product.discountPrice.toFixed(2)} Birr
							</p>
							<p className="text-lg text-muted-foreground line-through">
								{product.price.toFixed(2)} Birr
							</p>
							<Badge variant="destructive" className="text-sm">
								Save{" "}
								{((1 - product.discountPrice / product.price) * 100).toFixed(0)}
								%
							</Badge>
						</div>
					</div>
					<div className="flex space-x-2">
						<Badge>{product.condition}</Badge>
						<Badge variant="outline">{product.category}</Badge>
					</div>
					<p className="text-muted-foreground">{product.description}</p>
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="p-4">
							<h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
							<div className="grid grid-cols-2 gap-4">
								<Button
									className="w-full bg-orange-500 hover:bg-orange-600"
									onClick={() => handleContact("phone")}>
									<Phone className="mr-2 h-4 w-4" />
									Call Now
								</Button>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => handleContact("chat")}>
									<MessageSquare className="mr-2 h-4 w-4" />
									Chat
								</Button>
								<Button
									variant="secondary"
									className="w-full bg-[#5cc84d] text text-white"
									onClick={() => handleContact("whatsapp")}>
									<Send className="mr-2 h-4 w-4" />
									WhatsApp
								</Button>
								<Button
									className="w-full bg-[#0088cc] hover:bg-[#0077b5]"
									onClick={() => handleContact("telegram")}>
									<Send className="mr-2 h-4 w-4" />
									Telegram
								</Button>
							</div>
						</CardContent>
					</Card>
					<div className="flex items-center justify-between">
						<Button variant="outline" size="icon">
							<Heart className="h-4 w-4" />
						</Button>
						<Button variant="outline" size="icon">
							<Share2 className="h-4 w-4" />
						</Button>
					</div>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage
										src={product.seller.avatar}
										alt={product.seller.name}
									/>
									<AvatarFallback>{product.seller.name[0]}</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">{product.seller.name}</p>
									<div className="flex items-center">
										<Star className="h-4 w-4 text-yellow-400 fill-current" />
										<span className="ml-1 text-sm">
											{product.seller.rating} • {product.seller.totalSales}{" "}
											sales
										</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
					<p className="text-sm text-muted-foreground">
						Located in: {product.location}
					</p>
				</div>
			</div>
			<Tabs defaultValue="details" className="mt-8">
				<TabsList className="w-full justify-start">
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="shipping">Shipping</TabsTrigger>
					<TabsTrigger value="seller">Seller</TabsTrigger>
				</TabsList>
				<TabsContent value="details" className="mt-4">
					<Card>
						<CardContent className="p-4">
							<h2 className="text-xl font-semibold mb-4">Product Details</h2>
							<ul className="grid grid-cols-2 gap-2">
								<li className="flex items-center space-x-2">
									<span className="font-medium">Display:</span>
									<span>4K OLED</span>
								</li>
								<li className="flex items-center space-x-2">
									<span className="font-medium">Size:</span>
									<span>55 inches</span>
								</li>
								<li className="flex items-center space-x-2">
									<span className="font-medium">HDR:</span>
									<span>Dolby Vision, HDR10</span>
								</li>
								<li className="flex items-center space-x-2">
									<span className="font-medium">Smart TV:</span>
									<span>WebOS</span>
								</li>
								<li className="flex items-center space-x-2">
									<span className="font-medium">Connectivity:</span>
									<span>Wi-Fi, Bluetooth</span>
								</li>
								<li className="flex items-center space-x-2">
									<span className="font-medium">HDMI Ports:</span>
									<span>4</span>
								</li>
							</ul>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="shipping" className="mt-4">
					<Card>
						<CardContent className="p-4">
							<h2 className="text-xl font-semibold mb-4">
								Shipping Information
							</h2>
							<p>
								This item is available for local pickup in Addis Ababa or can be
								shipped nationwide within Ethiopia.
							</p>
							<p className="mt-2">
								Estimated shipping cost: 500 Birr - 1000 Birr depending on
								location
							</p>
							<p className="mt-2">Delivery time: 3-5 business days</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="seller" className="mt-4">
					<Card>
						<CardContent className="p-4">
							<h2 className="text-xl font-semibold mb-4">About the Seller</h2>
							<p>
								{product.seller.name} has been a trusted seller on our platform
								since 2019.
							</p>
							<p className="mt-2">
								Specializes in high-end electronics and home entertainment
								systems.
							</p>
							<p className="mt-2">
								Return policy: 30-day returns accepted for items in original
								condition. Buyer pays return shipping.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
