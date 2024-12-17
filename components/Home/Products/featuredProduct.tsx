"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllProducts } from "@lib/data";

const FeaturedProduct = () => {
	const [featuredProducts, setFeaturedProducts] = useState<any>([]);

	const fetcProductItems = async () => {
		const products = await getAllProducts();
		setFeaturedProducts(products);
	};

	useEffect(() => {
		fetcProductItems();
	}, []);

	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold">Featured Products</h2>
					<Button variant="outline" asChild>
						<Link href="/product">
							See More
							<ChevronRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
				<div className="relative">
					<div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide">
						{featuredProducts.map((product: any) => (
							<Card key={product.id} className="flex-shrink-0 w-[200px]">
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
			</div>
		</section>
	);
};

export default FeaturedProduct;
