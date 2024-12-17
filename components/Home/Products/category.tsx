"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Apple, Egg, Carrot, Milk, Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const categories = [
	{ name: "Fruits & Vegetables", icon: Apple },
	{ name: "Dairy Products", icon: Egg },
	{ name: "Beverages", icon: Carrot },
	{ name: "Snacks", icon: Fish },
	{ name: "Bakery", icon: Milk },
	{ name: "Wearables", icon: Apple },
	{ name: "Biisho", icon: Fish },
];
const Category = () => {
	return (
		<div>
			{" "}
			<section className="py-6 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-xl font-bold mb-8 text-navy-700">
						Shop by Category
					</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
						{categories.map((category) => (
							<Link
								key={category.name}
								href={`/category/${category.name.toLowerCase()}`}
								className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
								<category.icon className="h-12 w-12 mb-2 text-cyan-500" />
								<span className="text-sm font-medium text-center text-navy-700">
									{category.name}
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Category;
