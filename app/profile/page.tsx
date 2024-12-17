"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { LoadingDots } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { checkUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { UserIcon, PhoneIcon, MailIcon } from "lucide-react";

const formSchema = z.object({
	phone: z
		.string()
		.regex(/^\d{1,3}\d{10}$/, "Please enter a valid phone number."),
});

export default function LoginPage() {
	const { data: session } = useSession();
	const router = useRouter();
	const [signInClicked, setSignInClicked] = useState(false);
	const [providers, setProviders] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
			console.log({ res });
		})();
	}, []);

	return (
		<div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<div className="flex-1 hidden lg:flex lg:flex-col lg:justify-center lg:items-center">
				<div className="text-center text-white mb-8">
					<h1 className="text-5xl font-bold mb-4">Welcome to Biisho</h1>
					<p className="text-xl">{`Your gateway to seamless connections`}</p>
				</div>
				<Image
					src="/images/login-illustration.svg"
					alt="Login Illustration"
					width={600}
					height={600}
					className="max-w-2xl opacity-80"
				/>
			</div>
			<div className="flex-1 flex flex-col mt-12 items-center px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md">
					{session?.user ? (
						<Card className="w-full bg-white/10 backdrop-blur-md border-blue-300/30">
							<CardHeader>
								<CardTitle className="text-2xl font-bold text-center text-gray-700">
									Your Profile
								</CardTitle>
								<CardDescription className="text-center text-gray-600">
									Welcome back!
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col items-center space-y-6">
								<Avatar className="w-32 h-32 border-4 border-[#60799b]">
									<AvatarFallback className="bg-[#232f3f] text-white text-4xl">
										<UserIcon size={64} />
									</AvatarFallback>
								</Avatar>
								<div className="text-center text-white">
									<h3 className="text-2xl font-semibold mb-2 text-[#232f3f]">
										{session.user.name}
									</h3>
									<p className="text-[#394b63] flex items-center justify-center">
										<MailIcon className="mr-2" size={16} />
										{session.user.email}
									</p>
									<p className="text-[#394b63] flex items-center justify-center mt-1">
										<PhoneIcon className="mr-2" size={16} />
										251913228892
										{/* { session?.user?.phone ||
											"Phone number not available"} */}
									</p>
								</div>
								<Button
									onClick={() => signOut()}
									className="w-full bg-[#2a384b] hover:bg-[#314157] text-white transition duration-150 ease-in-out">
									Sign Out
								</Button>
							</CardContent>
						</Card>
					) : (
						<div className="w-full max-w-sm">
							<div className="text-center mb-8">
								<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
									Welcome to Biisho
								</h2>
								<p className=" text-sm text-gray-600">{`Let's get you found!`}</p>

								<Card className="w-full bg-white/10 backdrop-blur-md border-gray-300/80 mt-5">
									<CardHeader>
										<CardTitle className="text-2xl font-bold text-center text-blue-950">
											Sign in
										</CardTitle>
										<CardDescription className="text-center text-black">
											Enter your phone number to continue
										</CardDescription>
									</CardHeader>
									<CardContent>
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
													{loading ? (
														<LoadingDots color="#ffffff" />
													) : (
														"Continue"
													)}
												</Button>
											</form>
										</Form>
										<Separator className="my-6 bg-blue-300/30" />
										<div className="mt-6">
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
																	<svg
																		className="w-6 h-6 mr-2"
																		viewBox="0 0 24 24">
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
										</div>
										<p className="mt-6 text-center text-sm text-gray-700">
											By clicking continue, you agree to our{" "}
											<a href="#" className="text-blue-500 hover:underline">
												Terms of Service
											</a>{" "}
											and{" "}
											<a href="#" className="text-blue-300 hover:underline">
												Privacy Policy
											</a>
										</p>
									</CardContent>
								</Card>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
