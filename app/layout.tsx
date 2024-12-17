import type { Metadata } from "next";
import { Raleway as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@components/shared/footer";
import Provider from "@/components/Provider";
import "./globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Music Subscription Service",
	description: "Dashboard for Music Subscription Service",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Provider session={undefined}>
				<body
					className={cn(
						"min-h-screen bg-background font-sans antialiased mb-[7vh]",
						fontSans.variable
					)}>
					{children}
				</body>
				{/* <Footer /> */}
			</Provider>
		</html>
	);
}
