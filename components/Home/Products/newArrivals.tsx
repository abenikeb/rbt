"use client";
import { useEffect, useState } from "react";

import { Button } from "@components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { getAllProducts } from "@lib/data";

const NewArrivals = () => {
	const [newArrivals, setNewArrivals] = useState<any>([]);

	const fetcProductItems = async () => {
		const products = await getAllProducts();
		setNewArrivals(products);
	};

	useEffect(() => {
		fetcProductItems();
	}, []);

	return (
		<div>
			<section className="py-4 bg-gray-100">
				<div className="container mx-auto pl-4 pr-0">
					<h2 className="text-xl font-bold mb-4">New Arrivals</h2>
					<div className="relative">
						<div className="flex overflow-x-auto space-x-2 pb-4">
							{newArrivals.map((product: any) => (
								<div key={product.id} className="flex-none w-40">
									<div className="bg-white rounded-lg shadow-md overflow-hidden">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-40 object-cover"
										/>
										<div className="p-2">
											<h3 className="text-sm font-semibold truncate">
												{product.name}
											</h3>

											<p className="text-sm font-bold text-gray-800 mt-1">
												{product.price.toFixed(2)} ETB
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="absolute top-1/2 left-0 transform -translate-y-1/2">
							<Button
								size="icon"
								variant="ghost"
								className="rounded-full bg-white shadow-md">
								<ChevronLeft className="h-6 w-6" />
							</Button>
						</div>
						<div className="absolute top-1/2 right-0 transform -translate-y-1/2">
							<Button
								size="icon"
								variant="ghost"
								className="rounded-full bg-white shadow-md">
								<ChevronRight className="h-6 w-6" />
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default NewArrivals;
