"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardContents } from "@/components/ui/card";
import { Button } from "@components/ui/button";
import { getAllProducts } from "@lib/data";

const AllProducts = () => {
	const [allProducts, setAllProducts] = useState<any>([]);

	const fetcProductItems = async () => {
		const products = await getAllProducts();
		setAllProducts(products);
	};

	useEffect(() => {
		fetcProductItems();
	}, []);

	return (
		<section className="py-4 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-xl font-bold mb-4">All Products</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{allProducts.map((product: any) => (
						<div
							key={product.id}
							className="bg-white rounded-lg shadow-md overflow-hidden">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-32 object-cover"
							/>
							<div className="p-2">
								<h3 className="text-sm font-semibold truncate">
									{product.name}
								</h3>
								<p className="text-sm font-bold text-gray-800 mt-1">
									{product.price.toFixed(2)} ETB
								</p>
								<Button size="sm" className="w-full mt-2">
									Add to Cart
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default AllProducts;
