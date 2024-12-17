"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ChevronRight,
	Search,
	Laptop,
	User,
	Menu,
	Smartphone,
	Headphones,
	Camera,
	Tv,
	Watch,
	Gamepad,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import AllProducts from "@components/Home/Products/allProducts";

const popularProducts = [
	{
		id: 13,
		name: "Wireless Charging Pad",
		price: 39.99,
		image: "/placeholder.svg?height=200&width=200",
		category: "Accessories",
	},
	{
		id: 14,
		name: "Bluetooth Speaker",
		price: 79.99,
		image: "/placeholder.svg?height=200&width=200",
		category: "Audio",
	},
	{
		id: 15,
		name: "Fitness Tracker",
		price: 99.99,
		image: "/placeholder.svg?height=200&width=200",
		category: "Wearables",
	},
	{
		id: 16,
		name: "Portable SSD",
		price: 149.99,
		image: "/placeholder.svg?height=200&width=200",
		category: "Storage",
	},
];
const MostPopular = () => {
	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold">Most Popular</h2>
					<Button variant="outline" asChild>
						<Link href="/popular">
							See All Popular
							<ChevronRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{popularProducts.map((product) => (
						<Card key={product.id}>
							<CardContent className="flex flex-col items-center p-4">
								<Image
									src={product.image}
									alt={product.name}
									width={150}
									height={150}
									className="mb-2 rounded-md"
								/>
								<h3 className="font-semibold text-sm mb-1 text-center">
									{product.name}
								</h3>
								<Badge className="mb-1">{product.category}</Badge>
								<p className="text-sm text-muted-foreground mb-2">
									${product.price.toFixed(2)}
								</p>
								<Button size="sm" className="w-full">
									Add to Cart
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default MostPopular;
