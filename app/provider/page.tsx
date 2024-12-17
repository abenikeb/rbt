"use client";

import { useState } from "react";
import { MusicUploader } from "@/components/provider/MusicUploader";
import { MusicList } from "@/components/provider/MusicList";
import { ProviderStats } from "@/components/provider/ProviderStats";

import { Button } from "@/components/ui/button";
import { PlusCircle, Music, BarChart } from "lucide-react";
import { ProviderDashboard } from "@components/provider/ProviderDashboard";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User, Settings } from "lucide-react";
import { ProfileSection } from "@/components/provider/ProfileSection";
import { NotificationCenter } from "@/components/provider/NotificationCenter";

export interface Tone {
	id: number;
	name: string;
	plays: number;
	status: "pending" | "approved" | "rejected";
	isVerified?: boolean;
	genre: string;
}

export default function ProviderPage() {
	const [activeTab, setActiveTab] = useState<"upload" | "list" | "stats">(
		"list"
	);
	const [tones, setTones] = useState<Tone[]>([
		{
			id: 1,
			name: "Tizita Memories",
			plays: 15000,
			status: "approved",
			isVerified: true,
			genre: "Tizita",
		},
		{
			id: 2,
			name: "Bati Groove",
			plays: 8000,
			status: "approved",
			isVerified: true,
			genre: "Bati",
		},
		{
			id: 3,
			name: "Ambassel Nights",
			plays: 12000,
			status: "approved",
			isVerified: false,
			genre: "Ambassel",
		},
		{
			id: 4,
			name: "Ethio-Jazz Fusion",
			plays: 0,
			status: "pending",
			genre: "Ethio-Jazz",
		},
	]);
	const [showNotifications, setShowNotifications] = useState(false);
	const [showProfile, setShowProfile] = useState(false);
	const [selectedTone, setSelectedTone] = useState<Tone | null>(null);

	const handleToneClick = (tone: Tone) => {
		setSelectedTone(tone);
	};

	const handleToneUpload = (newTone: Tone) => {
		setTones([...tones, newTone]);
	};

	const router = useRouter();

	const handleLogout = () => {
		// In a real app, you would clear the authentication state here
		router.push("/");
	};

	return (
		// <ProviderDashboard />
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
			<header className="bg-white text-black py-4 flex flex-row ">
				<div className="container mx-auto px-4 flex flex-row gap-3 items-center">
					<img src="/assets/images/logo-tele.png" className="w-36" alt="" />
					<h1 className="text-3xl font-bold">Ad Provider Dashboard</h1>
				</div>

				{/* <div className="flex flex-row gap-3 items-center">
					<h1 className="text-2xl font-bold text-lime-500">Ad-RBT</h1>
				</div> */}

				<div className="flex items-center space-x-4 pr-5">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setShowNotifications(true)}>
						<Bell className="h-5 w-5" />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<User className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setShowProfile(true)}>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			{showProfile && <ProfileSection onClose={() => setShowProfile(false)} />}

			{showNotifications && (
				<NotificationCenter onClose={() => setShowNotifications(false)} />
			)}

			<main className="container mx-auto px-4 py-8">
				<div className="flex justify-center mb-8 space-x-4">
					<Button
						variant={activeTab === "upload" ? "default" : "outline"}
						onClick={() => setActiveTab("upload")}
						className="flex items-center">
						<PlusCircle className="mr-2 h-4 w-4" />
						Upload Tone
					</Button>
					<Button
						variant={activeTab === "list" ? "default" : "outline"}
						onClick={() => setActiveTab("list")}
						className="flex items-center">
						<Music className="mr-2 h-4 w-4" />
						My Tone
					</Button>
					<Button
						variant={activeTab === "stats" ? "default" : "outline"}
						onClick={() => setActiveTab("stats")}
						className="flex items-center">
						<BarChart className="mr-2 h-4 w-4" />
						Statistics
					</Button>
				</div>

				{activeTab === "upload" && <MusicUploader />}
				{activeTab === "list" && <MusicList />}
				{activeTab === "stats" && <ProviderStats />}
			</main>

			<footer className="bg-blue-900 text-white py-4 mt-12">
				<div className="container mx-auto px-4 text-center">
					<p>
						&copy; 2024 Tone Streaming. Empowering artists, enriching culture.
					</p>
				</div>
			</footer>
		</div>
	);
}
