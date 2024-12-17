"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Upload } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

export default function RegisterProviderPage() {
	const [formData, setFormData] = useState({
		companyName: "",
		contactPerson: "",
		email: "",
		phone: "",
		address: "",
		description: "",
		legalDocument: null as File | null,
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const router = useRouter();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData((prev) => ({ ...prev, legalDocument: e.target.files![0] }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the form data to your backend
		console.log("Form submitted:", formData);
		setIsSubmitted(true);
	};

	const handleBack = () => {
		router.back();
	};

	if (isSubmitted) {
		return (
			<div className="container mx-auto mt-10 p-6 max-w-md">
				<Alert className="bg-lime-50 border-lime-200">
					<AlertCircle className="h-4 w-4 text-lime-500" />
					<AlertTitle className="text-lime-700">Success!</AlertTitle>
					<AlertDescription className="text-lime-600">
						Your registration has been submitted successfully. Please wait for
						admin approval.
					</AlertDescription>
				</Alert>
				<Button
					className="mt-4 bg-lime-500 hover:bg-lime-600"
					onClick={() => router.push("/")}>
					Return to Home
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto mt-10 p-6 max-w-2xl">
			<Button
				variant="ghost"
				className="mb-4 text-lime-600 hover:text-lime-700 hover:bg-lime-50"
				onClick={handleBack}>
				<ArrowLeft className="mr-2 h-4 w-4" /> Back
			</Button>
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Register
					</CardTitle>
					<CardDescription className="text-center">
						Fill out the form below to register your company as a Tone provider.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="companyName">*Company Name</Label>
								<Input
									id="companyName"
									name="companyName"
									value={formData.companyName}
									onChange={handleInputChange}
									required
									className="border-gray-300 focus:border-lime-500 focus:ring-lime-500"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="contactPerson">*Contact Person</Label>
								<Input
									id="contactPerson"
									name="contactPerson"
									value={formData.contactPerson}
									onChange={handleInputChange}
									required
									className="border-gray-300 focus:border-lime-500 focus:ring-lime-500"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="border-gray-300 focus:border-lime-500 focus:ring-lime-500"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">*Phone</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									value={formData.phone}
									onChange={handleInputChange}
									required
									className="border-gray-300 focus:border-lime-500 focus:ring-lime-500"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="address">*Head Office Location</Label>
							<Textarea
								id="address"
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								required
								className="border-gray-300 focus:border-lime-500 focus:ring-lime-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">*Company Description</Label>
							<Textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								required
								className="border-gray-300 focus:border-lime-500 focus:ring-lime-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="legalDocument">*Trade License Document</Label>
							<div className="flex items-center space-x-2">
								<Input
									id="legalDocument"
									name="legalDocument"
									type="file"
									onChange={handleFileChange}
									required
									className="border-gray-300 focus:border-lime-500 focus:ring-lime-500"
								/>
								<Upload className="h-5 w-5 text-lime-500" />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						className="w-full bg-lime-500 hover:bg-lime-600 text-white"
						onClick={handleSubmit}>
						Submit Registration
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
