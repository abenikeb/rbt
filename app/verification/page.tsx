"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "@/lib/config/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	verificationCode: z
		.string()
		.min(5, {
			message: "Verification code must be 5 digits.",
		})
		.max(5, {
			message: "Verification code must be 5 digits.",
		}),
});

function VerificationPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const phone = searchParams.get("phone");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			verificationCode: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);

		try {
			const { data } = await axios.post(`${BASE_URL}/social-login`, {
				phone,
				ValidationCode: values.verificationCode,
				name: "Benjamin Asefa",
				image:
					"https://lh3.googleusercontent.com/a/ACg8ocIC2HHNtcAy7qyll3kGQucdAei6J5Uor5f8r4hk10PhUpbp5w=s96-c",
				type: "credential",
			});

			if (data.original.code !== "0") {
				throw new Error("Network response was not ok");
			}

			toast({
				title: "Verification Successful",
				description: "You have successfully verified your phone number.",
				variant: "default",
			});
			router.replace(`/profile`);
		} catch (error) {
			toast({
				title: "Verification Failed",
				description: "Please try again later.",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="flex-1 hidden lg:block">
				<div className="h-full flex items-center justify-center bg-gray-50 bg-opacity-10">
					<Image
						src="/images/verify-illustration.svg"
						alt="Verification Illustration"
						width={600}
						height={600}
						className="max-w-2xl"
					/>
				</div>
			</div>
			<div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">
							Verify Your Phone
						</CardTitle>
						<CardDescription className="text-center">
							Enter the verification code sent to your mobile number
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-center mb-6">
							<Image
								src="/assets/images/verification.png"
								alt="verification"
								width={200}
								height={200}
							/>
						</div>
						<p className="text-sm text-center text-gray-700 mb-6">
							Code sent to <span className="font-bold">{phone}</span>
						</p>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6">
								<FormField
									control={form.control}
									name="verificationCode"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter 5-digit code"
													className="text-center text-2xl tracking-widest"
													maxLength={5}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									className="w-full bg-[#232f3f]"
									disabled={loading}>
									{loading ? "Verifying..." : "Verify"}
								</Button>
							</form>
						</Form>
						<div className="flex justify-between mt-6 text-sm">
							<Button variant="link" className="text-blue-600 p-0">
								Resend Code
							</Button>
							<Button variant="link" className="text-blue-600 p-0">
								Contact Support
							</Button>
						</div>
						<p className="mt-6 text-xs text-center text-gray-500">
							By verifying, you agree to our{" "}
							<a href="#" className="text-blue-600 hover:underline">
								Terms of Service
							</a>{" "}
							and{" "}
							<a href="#" className="text-blue-600 hover:underline">
								Privacy Policy
							</a>
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default function PageWrapper() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerificationPage />
		</Suspense>
	);
}
