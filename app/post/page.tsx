"use client";

import { useState, useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone } from "react-dropzone";
import { Loader2, X } from "lucide-react";
import { LoadingDots } from "@components/shared/icons";
import { checkUser } from "@lib/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";

const categories = [
	{ value: "computers", label: "Computers" },
	{ value: "phones", label: "Phones & Tablets" },
	{ value: "audio", label: "Audio" },
];

const subCategories = {
	computers: [
		{ value: "laptop", label: "Laptop" },
		{ value: "desktop", label: "Desktop" },
	],
	phones: [
		{ value: "smartphone", label: "Smartphone" },
		{ value: "tablet", label: "Tablet" },
	],
	audio: [
		{ value: "headphones", label: "Headphones" },
		{ value: "speakers", label: "Speakers" },
	],
};

const conditions = [
	{ value: "new", label: "New" },
	{ value: "like-new", label: "Like New" },
	{ value: "good", label: "Good" },
	{ value: "fair", label: "Fair" },
	{ value: "poor", label: "Poor" },
];

const deliveryOptions = [
	{ id: "pickup", label: "Local Pickup" },
	{ id: "shipping", label: "Shipping" },
	{ id: "both", label: "Both Pickup and Shipping" },
];

const states = [
	{ value: "AA", label: "Addis Ababa" },
	{ value: "AD", label: "Adama" },
	{ value: "HA", label: "Hawasa" },
];

const cities = {
	AA: [
		{ value: "addis-ketema", label: "Addis Ketema" },
		{ value: "bole", label: "Bole" },
		{ value: "yeka", label: "Yeka" },
	],
	AD: [
		{ value: "sub-city", label: "Sub City" },
		{ value: "buffalo", label: "Buffalo" },
		{ value: "albany", label: "Albany" },
	],
	HA: [
		{ value: "houston", label: "Houston" },
		{ value: "austin", label: "Austin" },
		{ value: "dallas", label: "Dallas" },
	],
};

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	phone: z.any(),
	category: z.string({
		required_error: "Please select a category.",
	}),
	subCategory: z.string({
		required_error: "Please select a sub-category.",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),
	location: z.string({
		required_error: "Please select a state.",
	}),
	city: z.string({
		required_error: "Please select a city.",
	}),
	brand: z.string().min(2, {
		message: "Brand must be at least 2 characters.",
	}),
	model: z.string().min(2, {
		message: "Model must be at least 2 characters.",
	}),
	condition: z.string({
		required_error: "Please select a condition.",
	}),
	price: z.number().min(0, {
		message: "Price must be a positive number.",
	}),
	deliveryOptions: z.array(z.string()).refine((value) => value.length > 0, {
		message: "You must select at least one delivery option.",
	}),
	processor: z.string().optional(),
	ram: z.string().optional(),
	storage: z.string().optional(),
	screenSize: z.string().optional(),
	batteryLife: z.string().optional(),
	cameraResolution: z.string().optional(),
	driverSize: z.string().optional(),
	frequency: z.string().optional(),
	youtubeLink: z.string().url().optional().or(z.literal("")),
});

export default function ProductPostForm() {
	const { data: session } = useSession();
	const router = useRouter();
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [images, setImages] = useState<File[]>([]);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [signInClicked, setSignInClicked] = useState(false);
	const [providers, setProviders] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	// const { data: session, status } = useSession();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			location: "",
			city: "",
			brand: "",
			model: "",
			price: 0,
			deliveryOptions: [],
			youtubeLink: "",
		},
	});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setImages((prevImages) => [...prevImages, ...acceptedFiles]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".gif"],
		},
		multiple: true,
	});

	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
			console.log({ res });
		})();
	}, []);

	// useEffect(() => {
	// 	if (status === "unauthenticated") {
	// 		setShowLoginModal(true);
	// 	}
	// }, [status]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		console.log("Images:", images);
	}

	const phoneSubmit = async (values: any) => {
		setLoading(true);

		try {
			const userResult = await checkUser(values.phone);
			if (userResult && userResult.code === "2") {
				return router.push(`/verification?phone=${values.phone}`);
			}
			const result: any = await signIn("credentials", {
				redirect: false,
				phone: values.phone,
			});

			console.log({ result });

			if (result.error) {
				console.error("Sign-in Error:", result.error);
				return;
			}

			window.location.href = "/profile";
		} catch (error) {
			console.error("An error occurred during sign-in:", error);
		} finally {
			setLoading(false);
		}
	};

	// if (status === "loading") {
	// 	return (
	// 		<div className="flex justify-center items-center h-screen">
	// 			<Loader2 className="h-8 w-8 animate-spin" />
	// 		</div>
	// 	);
	// }

	return (
		<div className="max-w-4xl mx-auto p-2 space-y-8 relative">
			{!session?.user && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
					<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-1/2">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold">Login Required</h2>
							<button
								onClick={() => setShowLoginModal(false)}
								className="text-gray-500 hover:text-gray-700">
								<X className="h-6 w-6" />
							</button>
						</div>
						<p className="mb-6">
							Please log in to access the product post form.
						</p>
						<div className="space-y-4">
							{providers &&
								Object.values(providers)
									.filter((provider: any) => provider.id === "google")
									.map((provider: any) => (
										<Button
											key={provider.name}
											onClick={() => {
												signIn(provider.id);
												setSignInClicked(true);
											}}
											className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 transition duration-150 ease-in-out h-10 text-base"
											disabled={signInClicked}>
											{signInClicked ? (
												<LoadingDots color="#1e3a8a" />
											) : (
												<span className="flex items-center justify-center">
													<svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
														<path
															fill="#4285F4"
															d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
														/>
														<path
															fill="#34A853"
															d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
														/>
														<path
															fill="#FBBC05"
															d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
														/>
														<path
															fill="#EA4335"
															d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
														/>
														<path fill="none" d="M1 1h22v22H1z" />
													</svg>
													Continue with Google
												</span>
											)}
										</Button>
									))}
							<Separator className="my-6 bg-blue-300/30" />
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4">
									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<PhoneInput
														country={"et"}
														value={field.value}
														onChange={(phone) => field.onChange(phone)}
														inputClass="rounded-md py-5 px-10 w-full border-blue-300 bg-blue-800/30 text-gray-700 placeholder-blue-300"
														containerClass="w-full"
														buttonClass="bg-blue-800/30 border-blue-50"
														dropdownClass="bg-blue-800 text-white"
														countryCodeEditable={false}
														enableSearch={true}
														placeholder="Enter phone number"
													/>
												</FormControl>
												<FormMessage className="text-red-300" />
											</FormItem>
										)}
									/>
									<Button
										type="submit"
										className="w-full bg-[#3d506a] hover:bg-blue-700 text-white transition duration-150 ease-in-out h-[2.7rem] text-lg"
										disabled={loading}>
										{loading ? <LoadingDots color="#ffffff" /> : "Continue"}
									</Button>
								</form>
							</Form>
						</div>
					</div>
				</div>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<Card className="p-0">
						<CardHeader>
							<CardTitle>Post Your Ad</CardTitle>
						</CardHeader>
						<hr />
						<br />
						<CardContent className="space-y-5">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title*</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter product title"
												{...field}
												required
												autoFocus
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* category */}
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
												setCategory(value);
												setSubCategory("");
												form.setValue("subCategory", "");
											}}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map((category) => (
													<SelectItem
														key={category.value}
														value={category.value}>
														{category.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{category && (
								<FormField
									control={form.control}
									name="subCategory"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Sub-Category</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setSubCategory(value);
												}}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a sub-category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{subCategories[
														category as keyof typeof subCategories
													].map((subCategory) => (
														<SelectItem
															key={subCategory.value}
															value={subCategory.value}>
															{subCategory.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{/* Location */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="location"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location*</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setSelectedState(value);
													form.setValue("city", "");
												}}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a location" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{states.map((state) => (
														<SelectItem key={state.value} value={state.value}>
															{state.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{selectedState && (
									<FormField
										control={form.control}
										name="city"
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<Select onValueChange={field.onChange}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a city" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{cities[selectedState as keyof typeof cities].map(
															(city) => (
																<SelectItem key={city.value} value={city.value}>
																	{city.label}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</div>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description*</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter product description"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{subCategory && (
								<>
									{/* Images */}
									<div>
										<FormLabel>Add at least 2 photos</FormLabel>
										<div
											{...getRootProps()}
											className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
												isDragActive ? "bg-blue-50" : ""
											}`}>
											<div className="text-center">
												<svg
													className="mx-auto h-12 w-12 text-gray-300"
													viewBox="0 0 24 24"
													fill="currentColor"
													aria-hidden="true">
													<path
														fillRule="evenodd"
														d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
														clipRule="evenodd"
													/>
												</svg>
												<div className="mt-4 flex text-sm leading-6 text-gray-600">
													<label
														htmlFor="file-upload"
														className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
														<span>Upload files</span>
														<input {...getInputProps()} />
													</label>
													<p className="pl-1">or drag and drop</p>
												</div>
												<p className="text-xs leading-5 text-gray-600">
													PNG, JPG, GIF up to 10MB
												</p>
											</div>
										</div>
										{images.length > 0 && (
											<div className="mt-4">
												<p>{images.length} file(s) selected</p>
												<ul className="list-disc pl-5">
													{images.map((file, index) => (
														<li key={index}>{file.name}</li>
													))}
												</ul>
											</div>
										)}
									</div>
									<FormField
										control={form.control}
										name="brand"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Brand</FormLabel>
												<FormControl>
													<Input placeholder="Enter brand name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="model"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Model</FormLabel>
												<FormControl>
													<Input placeholder="Enter model name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="condition"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Condition</FormLabel>

												<Select onValueChange={field.onChange}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select condition" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{conditions.map((condition) => (
															<SelectItem
																key={condition.value}
																value={condition.value}>
																{condition.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Price</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="Enter price"
														{...field}
														onChange={(e) =>
															field.onChange(parseFloat(e.target.value))
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="deliveryOptions"
										render={() => (
											<FormItem>
												<div className="mb-4">
													<FormLabel className="text-base">
														Delivery Options
													</FormLabel>
													<FormDescription>
														Select the available delivery options for your
														product.
													</FormDescription>
												</div>
												{deliveryOptions.map((item) => (
													<FormField
														key={item.id}
														control={form.control}
														name="deliveryOptions"
														render={({ field }) => {
															return (
																<FormItem
																	key={item.id}
																	className="flex flex-row items-start space-x-3 space-y-0">
																	<FormControl>
																		<Checkbox
																			checked={field.value?.includes(item.id)}
																			onCheckedChange={(checked) => {
																				return checked
																					? field.onChange([
																							...field.value,
																							item.id,
																					  ])
																					: field.onChange(
																							field.value?.filter(
																								(value) => value !== item.id
																							)
																					  );
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal">
																		{item.label}
																	</FormLabel>
																</FormItem>
															);
														}}
													/>
												))}
												<FormMessage />
											</FormItem>
										)}
									/>

									{(subCategory === "laptop" || subCategory === "desktop") && (
										<>
											<FormField
												control={form.control}
												name="processor"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Processor</FormLabel>
														<FormControl>
															<Input
																placeholder="Enter processor details"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="ram"
												render={({ field }) => (
													<FormItem>
														<FormLabel>RAM</FormLabel>
														<FormControl>
															<Input placeholder="Enter RAM size" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="storage"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Storage</FormLabel>
														<FormControl>
															<Input
																placeholder="Enter storage capacity"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</>
									)}

									{(subCategory === "laptop" || subCategory === "tablet") && (
										<FormField
											control={form.control}
											name="screenSize"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Screen Size</FormLabel>
													<FormControl>
														<Input placeholder="Enter screen size" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}

									{(subCategory === "laptop" ||
										subCategory === "smartphone" ||
										subCategory === "tablet") && (
										<FormField
											control={form.control}
											name="batteryLife"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Battery Life</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter battery life"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}

									{(subCategory === "smartphone" ||
										subCategory === "tablet") && (
										<FormField
											control={form.control}
											name="cameraResolution"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Camera Resolution</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter camera resolution"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}

									{subCategory === "speakers" && (
										<FormField
											control={form.control}
											name="driverSize"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Driver Size</FormLabel>
													<FormControl>
														<Input placeholder="Enter driver size" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}

									{(subCategory === "headphones" ||
										subCategory === "speakers") && (
										<FormField
											control={form.control}
											name="frequency"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Frequency Response</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter frequency response"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
								</>
							)}

							{/* YOutube Link */}
							<FormField
								control={form.control}
								name="youtubeLink"
								render={({ field }) => (
									<FormItem>
										<FormLabel>YouTube Link</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter YouTube video link (optional)"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Add a YouTube link to showcase your product (optional)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					<Button
						type="submit"
						className="w-full bg-orange-400 hover:bg-orange-400 text-white h-12">
						Submit Product Listing
					</Button>
				</form>
			</Form>
		</div>
	);
}
