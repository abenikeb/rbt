"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetail() {
	const [quantity, setQuantity] = useState(1);

	const product = {
		name: "Premium Wireless Headphones",
		price: 299.99,
		rating: 4.5,
		reviews: 128,
		description:
			"Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life, these headphones are perfect for Music enthusiasts and professionals alike.",
		features: [
			"Active Noise Cancellation",
			"40-hour battery life",
			"Bluetooth 5.0 connectivity",
			"Comfortable over-ear design",
			"Built-in microphone for calls",
		],
		specs: {
			"Driver Size": "40mm",
			"Frequency Response": "20Hz - 20kHz",
			"Impedance": "32 Ohm",
			"Weight": "250g",
		},
		colors: ["Black", "Silver", "Blue"],
		images: [
			"/assets/images/product1.jpg?height=400&width=400",
			"/assets/images/product1.jpg?height=400&width=400",
			"/assets/images/product1.jpg?height=400&width=400",
		],
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid md:grid-cols-2 gap-8">
				<div className="space-y-4">
					<div className="relative aspect-square">
						<Image
							src={product.images[0]}
							alt={product.name}
							layout="fill"
							objectFit="cover"
							className="rounded-lg"
						/>
					</div>
					<div className="flex space-x-4">
						{product.images.slice(1).map((image, index) => (
							<div key={index} className="relative w-20 h-20">
								<Image
									src={image}
									alt={`${product.name} - View ${index + 2}`}
									layout="fill"
									objectFit="cover"
									className="rounded-md"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-6">
					<h1 className="text-3xl font-bold">{product.name}</h1>
					<div className="flex items-center space-x-2">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-5 h-5 ${
										i < Math.floor(product.rating)
											? "text-yellow-400 fill-current"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-muted-foreground">
							{product.rating} ({product.reviews} reviews)
						</span>
					</div>
					<p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
					<p className="text-muted-foreground">{product.description}</p>
					<div className="space-y-4">
						<div>
							<Label htmlFor="color">Color</Label>
							<RadioGroup id="color" className="flex space-x-2 mt-2">
								{product.colors.map((color) => (
									<div key={color}>
										<RadioGroupItem
											value={color}
											id={`color-${color}`}
											className="peer sr-only"
										/>
										<Label
											htmlFor={`color-${color}`}
											className="flex items-center justify-center rounded-full w-8 h-8 bg-primary text-primary-foreground peer-data-[state=checked]:ring-2 ring-primary">
											{color[0]}
										</Label>
									</div>
								))}
							</RadioGroup>
						</div>
						<div className="flex items-center space-x-4">
							<Label htmlFor="quantity">Quantity</Label>
							<Input
								type="number"
								id="quantity"
								className="w-20"
								min={1}
								value={quantity}
								onChange={(e) => setQuantity(parseInt(e.target.value))}
							/>
						</div>
					</div>
					<div className="flex space-x-4">
						<Button className="flex-1">
							<ShoppingCart className="w-4 h-4 mr-2" />
							Add to Cart
						</Button>
						<Button variant="outline" size="icon">
							<Heart className="w-4 h-4" />
						</Button>
						<Button variant="outline" size="icon">
							<Share2 className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
			<Tabs defaultValue="features" className="mt-12">
				<TabsList>
					<TabsTrigger value="features">Features</TabsTrigger>
					<TabsTrigger value="specs">Specifications</TabsTrigger>
				</TabsList>
				<TabsContent value="features" className="mt-4">
					<ul className="list-disc pl-5 space-y-2">
						{product.features.map((feature, index) => (
							<li key={index}>{feature}</li>
						))}
					</ul>
				</TabsContent>
				<TabsContent value="specs" className="mt-4">
					<dl className="grid grid-cols-2 gap-4">
						{Object.entries(product.specs).map(([key, value]) => (
							<div key={key}>
								<dt className="font-semibold">{key}</dt>
								<dd>{value}</dd>
							</div>
						))}
					</dl>
				</TabsContent>
			</Tabs>
		</div>
	);
}
