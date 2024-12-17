"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
// import { UploadToneForm } from "./UploadToneForm";
import { PlaybackPerformance } from "./PlaybackPerformance";
import { ToneList } from "./ToneList";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User, Music, BarChart, Settings } from "lucide-react";
import { ProfileSection } from "./ProfileSection";
import { NotificationCenter } from "./NotificationCenter";

export interface Tone {
	id: number;
	name: string;
	plays: number;
	status: "pending" | "approved" | "rejected";
	isVerified?: boolean;
	genre: string;
}

export function ProviderDashboard() {
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
	const [selectedTone, setSelectedTone] = useState<Tone | null>(null);
	const [showProfile, setShowProfile] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

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
		<div className="space-y-6">
			<div className="flex justify-between items-center bg-green-700 text-white p-4 rounded-lg">
				<h1 className="text-3xl font-bold">
					Ethiopian Music Provider Dashboard
				</h1>

				<div className="flex items-center space-x-4">
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
			</div>

			{showProfile && <ProfileSection onClose={() => setShowProfile(false)} />}

			{showNotifications && (
				<NotificationCenter onClose={() => setShowNotifications(false)} />
			)}

			<Tabs defaultValue="upload" className="space-y-6">
				<TabsList className="bg-yellow-100">
					<TabsTrigger
						value="upload"
						className="data-[state=active]:bg-yellow-300">
						<Music className="mr-2 h-4 w-4" />
						Manage Content
					</TabsTrigger>
					<TabsTrigger
						value="performance"
						className="data-[state=active]:bg-yellow-300">
						<BarChart className="mr-2 h-4 w-4" />
						Playback Performance
					</TabsTrigger>
				</TabsList>
				<TabsContent value="upload">
					<Card className="bg-white shadow-lg">
						<CardHeader className="bg-red-700 text-white rounded-t-lg">
							<CardTitle>Upload New Ethiopian Music</CardTitle>
							<CardDescription className="text-red-100">
								Share your unique Ethiopian melodies with our global audience.
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							{/* <UploadToneForm onToneUpload={handleToneUpload} /> */}
						</CardContent>
					</Card>
					<Card className="mt-6 bg-white shadow-lg">
						<CardHeader className="bg-green-700 text-white rounded-t-lg">
							<CardTitle>Your Ethiopian Tones</CardTitle>
							<CardDescription className="text-green-100">
								Manage your uploaded Ethiopian music and track their status.
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							{/* <ToneList tones={tones} onToneClick={handleToneClick} /> */}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="performance">
					<Card className="bg-white shadow-lg">
						<CardHeader className="bg-yellow-600 text-white rounded-t-lg">
							<CardTitle>Playback Performance</CardTitle>
							<CardDescription className="text-yellow-100">
								{selectedTone
									? `Performance for "${selectedTone.name}"`
									: "Track the performance of your approved Ethiopian tones."}
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							{/* <PlaybackPerformance
								tones={
									selectedTone
										? [selectedTone]
										: tones.filter((t) => t.status === "approved")
								}
								onBackClick={() => setSelectedTone(null)}
								showBackButton={!!selectedTone}
							/> */}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
