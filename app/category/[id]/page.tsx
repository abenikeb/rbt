"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getAllProducts } from "@lib/data";

export default function CategoryPage({ params }: any) {
	const [searchQuery, setSearchQuery] = useState("");
	const [priceRange, setPriceRange] = useState([0, 400000]);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState("featured");
	const [viewMode, setViewMode] = useState("grid");
	const [isLoading, setIsLoading] = useState(true);
	const productsPerPage = viewMode === "grid" ? 6 : 5;
	const [allCategoryProducts, setAllCategoryProducts] = useState<any>([]);
	const router = useRouter();
	const searchParams = useSearchParams();

	// const selectedCategory = searchParams.get("name") || "All";
	const selectedCategory = params.id || "All";

	const fetcProductItems = async () => {
		const products = await getAllProducts();
		setAllCategoryProducts(products);
	};

	useEffect(() => {
		fetcProductItems();
	}, []);

	useEffect(() => {
		// Simulate loading delay
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	// Filter products based on category and search query
	const filteredProducts = allCategoryProducts.filter(
		(product: any) =>
			(selectedCategory === "All" ||
				product.category.toLowerCase() === selectedCategory) &&
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
			product.price >= priceRange[0] &&
			product.price <= priceRange[1]
	);

	// Sort products based on user selection
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (sortBy) {
			case "priceLowToHigh":
				return a.price - b.price;
			case "priceHighToLow":
				return b.price - a.price;
			case "rating":
				return b.rating - a.rating;
			default:
				return 0;
		}
	});

	// Pagination logic
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = sortedProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleProductClick = (productId: number) => {
		router.push(`/product/${productId}`);
	};

	const ProductCard = ({ product, viewMode }: any) => (
		<Card
			className={`flex ${
				viewMode === "list" ? "flex-row" : "flex-col"
			} overflow-hidden group h-full`}>
			<div className={`relative ${viewMode === "list" ? "w-1/2" : "w-full"}`}>
				<Image
					src={product.image}
					alt={product.name}
					width={400}
					height={300}
					className={`object-cover ${
						viewMode === "list" ? "h-full" : "h-40"
					} w-full transition-transform duration-300 group-hover:scale-110`}
				/>
				<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
					<Button
						onClick={() => handleProductClick(product.id)}
						variant="secondary">
						View Details
					</Button>
				</div>
			</div>
			<CardContent
				className={`p-4 flex flex-col justify-between flex-grow ${
					viewMode === "list" ? "w-2/3" : "w-full"
				}`}>
				<div>
					<h2 className="font-semibold text-lg mb-1 line-clamp-1">
						{product.name}
					</h2>
					{viewMode === "list" && (
						<p className="text-sm text-gray-600 mb-2 line-clamp-2">
							{product.description}
						</p>
					)}
				</div>
				<div className="mt-2">
					<div className="flex items-center justify-between">
						<p className="font-bold text-primary">
							{product.price.toFixed(2)} ETB
						</p>
						<div className="flex items-center">
							<span className="text-yellow-400 mr-1">★</span>
							<span className="text-sm font-medium">
								{product.rating.toFixed(1)}
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);

	const SkeletonCard = ({ viewMode }: any) => (
		<Card
			className={`flex ${
				viewMode === "list" ? "flex-row" : "flex-col"
			} overflow-hidden h-full`}>
			<div className={`${viewMode === "list" ? "w-1/3" : "w-full"}`}>
				<Skeleton
					className={`${viewMode === "list" ? "h-full" : "h-48"} w-full`}
				/>
			</div>
			<CardContent
				className={`p-4 flex flex-col justify-between flex-grow ${
					viewMode === "list" ? "w-2/3" : "w-full"
				}`}>
				<div>
					<Skeleton className="h-6 w-3/4 mb-2" />
					<div className="flex justify-between items-center mb-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-24" />
					</div>
					{viewMode === "list" && <Skeleton className="h-4 w-full mb-2" />}
				</div>
				<div className="mt-4">
					<div className="flex items-center justify-between">
						<Skeleton className="h-6 w-20" />
						<Skeleton className="h-4 w-10" />
					</div>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<div className="container mx-auto px-4 pt-2 pb-20">
			<header className="flex flex-row items-center mb-2">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/">
						<ArrowLeft className="h-6 w-6" />
						<span className="sr-only">Back</span>
					</Link>
				</Button>
				<h1 className="text-xl font-bold ml-2">{selectedCategory} Products</h1>
			</header>
			<div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
				<div className="w-full md:w-1/3 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<Input
						type="search"
						placeholder="Search products..."
						className="pl-10"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>
			<div
				className={`grid gap-3 mb-8 ${
					viewMode === "grid" ? "grid-cols-2 sm:grid-cols-2" : "grid-cols-1"
				}`}>
				{isLoading
					? Array.from({ length: productsPerPage }).map((_, index) => (
							<SkeletonCard key={index} viewMode={viewMode} />
					  ))
					: currentProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								viewMode={viewMode}
							/>
					  ))}
			</div>
			{!isLoading && sortedProducts.length > productsPerPage && (
				<div className="flex justify-center items-center space-x-2">
					<Button
						variant="outline"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}>
						<ChevronLeft className="h-4 w-4 mr-2" />
						Previous
					</Button>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<Button
							key={page}
							variant={currentPage === page ? "default" : "outline"}
							onClick={() => handlePageChange(page)}>
							{page}
						</Button>
					))}
					<Button
						variant="outline"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}>
						Next
						<ChevronRight className="h-4 w-4 ml-2" />
					</Button>
				</div>
			)}
		</div>
	);
}
